import {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  FormEvent,
} from "react";
import { v4 as uuid } from "uuid";

// contexts
import { ChatbotContext } from "@contexts/ChatbotContext";
import { AuthContext } from "@contexts/AuthContext";
import { UserContext } from "@contexts/UserContext";

// constants
import {
  depts,
  deptsAnswer,
  deptsMessages,
} from "@features/department/constants/depts";

// db
import { getDocs, Timestamp, doc, onSnapshot } from "firebase/firestore";

// hooks
import useSound from "@hooks/useSound";

// lib
import { greet } from "@lib/greet";
import { userPost } from "@lib/user";
import {
  processDepartmentServicesResponse,
  processFileResponse,
  processLinkResponse,
} from "@lib/process-response";
import postQuery from "@lib/post-query";

// utils
import { sleep } from "@utils/sleep";
import { splitMessage } from "@utils/split-message";
import {
  hasSplitSymbol,
  hasFileSymbol,
  hasLinkSymbol,
} from "@utils/symbol-checker";
import { smoothScrollInto } from "@utils/scroll-into";
import { extractLink } from "@utils/extract-link";
import { extractFileNameFromUrl } from "@utils/extract-file-name-from-url";

// shared
import { chatType, deptsType } from "@shared/ts/type";
import { usersCollectionRef } from "@shared/collection-refs";

const useChatbot = () => {
  const auth = useContext(AuthContext);
  const { isSignedIn } = auth.user;
  const user = useContext(UserContext);
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;
  const { conversation, setConversation } = chatbot.conversation;
  const { error, setError } = chatbot.error;
  const { isOnline } = chatbot.isOnline;
  const { setIsChatPaused } = chatbot.isChatPaused;
  const { isBotTyping, setIsBotTyping } = chatbot.isTyping;
  const { playMessageNotification } = useSound();
  const latestChat = useRef<HTMLDivElement | null>(null);
  const [isAtLatestChat, setIsAtLatestChat] = useState<boolean>(false);
  const questionsListRef = useRef<HTMLDivElement | null>(null);
  const [settings, setSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFaqsMenuActive, setIsFaqsMenuActive] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");

  let chatData: chatType = {
    chat: "",
    chatId: "",
    role: "",
    timestamp: Timestamp.now(),
  };

  const toggleSettings = () => {
    setSettings(!settings);
  };

  const getConversationHistory = useCallback(async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      onSnapshot(doc(usersCollectionRef, user.uid), (doc) => {
        if (doc.exists()) setConversation(doc.data().conversation);
        // data in configuration will take time and we have to check if its there
        // this will prevent greet to get undefined 2nd argument that will cause error
        else if (!doc.exists() && configuration.initialGreet) {
          greet(user.uid, configuration.initialGreet);
        }
      });
      if (data) setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      if (!error) setError(false);
    }
  }, [configuration.initialGreet, setConversation, setError]);

  const getReplyFromBot = async (message: string) => {
    try {
      console.time(`${configuration.name} Replied in`);
      setIsBotTyping(true);
      const chatbotQuery = await postQuery(message);

      if (chatbotQuery.success) {
        setError(false);
        await sleep(1);

        if (deptsMessages.includes(message)) {
          const deptServicesResponse = [deptsAnswer, depts];

          deptServicesResponse.forEach(
            async (response: string | deptsType, i: number) => {
              if (i == 1) {
                await sleep(1);
                setIsBotTyping(true);
                await sleep(1);
              }
              chatData = processDepartmentServicesResponse(
                response,
                deptsAnswer,
                depts,
              );
              setIsBotTyping(false);
              userPost(user.uid, chatData);
              playMessageNotification();
            },
          );
          setIsChatPaused(true);
          //
          //
          //
        } else {
          const { intent, answer } = chatbotQuery.response;

          if (hasSplitSymbol(answer)) {
            const botHasMultipleMessage = splitMessage(answer);
            botHasMultipleMessage.forEach(
              async (response: string, i: number) => {
                if (i == 1) {
                  await sleep(1);
                  setIsBotTyping(true);
                  await sleep(1);
                }
                chatData = {
                  intent: intent,
                  chat: response,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
                setIsBotTyping(false);
                userPost(user.uid, chatData);
                setIsFaqsMenuActive(false);
                playMessageNotification();
              },
            );
          } else if (hasLinkSymbol(answer)) {
            const { link, linkMessage } = extractLink(answer);
            chatData = linkMessage
              ? processLinkResponse(intent, link, linkMessage)
              : processLinkResponse(intent, link);
            setIsBotTyping(false);
            userPost(user.uid, chatData);
            setIsFaqsMenuActive(false);
            playMessageNotification();
          } else if (hasFileSymbol(answer)) {
            const { text, link } = extractLink(answer);
            const fileName = link ? extractFileNameFromUrl(link) : "";
            const fileExtension = fileName?.split(".")[1];

            const withFileResponse: string[] = text && link ? [text, link] : [];

            withFileResponse.forEach(async (response: string, i: number) => {
              if (i == 1) {
                await sleep(1);
                setIsBotTyping(true);
                await sleep(1);
              }
              chatData =
                fileExtension && text
                  ? processFileResponse(
                      fileExtension,
                      fileName,
                      response,
                      intent,
                      text,
                    )
                  : chatData;
              setIsBotTyping(false);
              userPost(user.uid, chatData);
              setIsFaqsMenuActive(false);
              playMessageNotification();
            });
          } else {
            chatData = {
              intent: intent,
              chat: answer,
              chatId: uuid(),
              role: "bot",
              timestamp: Timestamp.now(),
            };
            setIsBotTyping(false);
            userPost(user.uid, chatData);
            setIsFaqsMenuActive(false);
            playMessageNotification();
          }
        }
      }
      console.timeEnd(`${configuration.name} Replied in`);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setIsBotTyping(false);
      setIsChatPaused(false);
    }
  };

  const sendMessageToBot = useCallback(
    async (
      event:
        | React.KeyboardEvent<HTMLTextAreaElement>
        | FormEvent<HTMLInputElement | HTMLFormElement>,
      message: string,
    ) => {
      try {
        event.preventDefault();
        setUserMessage("");
        setIsChatPaused(true);
        setError(false);
        chatData = {
          chat: message,
          chatId: uuid(),
          role: "user",
          timestamp: Timestamp.now(),
        };
        playMessageNotification();
        userPost(user.uid, chatData);
        await sleep(1);
        getReplyFromBot(message);
      } catch (error) {
        console.log(error);
        setIsBotTyping(false);
        setError(true);
        if (!error) setError(false);
      }
    },
    [playMessageNotification, setError],
  );

  const sendSuggestedQueryToBot = async (message: string) => {
    try {
      setIsFaqsMenuActive(false);
      setIsChatPaused(true);
      setError(false);
      chatData = {
        chat: message,
        chatId: uuid(),
        role: "user",
        timestamp: Timestamp.now(),
      };
      playMessageNotification();
      userPost(user.uid, chatData);
      await sleep(1);
      getReplyFromBot(message);
    } catch (error) {
      console.log(error);
      setIsBotTyping(false);
      setError(true);
      if (!error) setError(false);
    }
  };

  // for auto scrolling
  useEffect(() => {
    const atLatestChat = smoothScrollInto(latestChat);
    if (isSignedIn && atLatestChat) setIsAtLatestChat(true);
  }, [conversation, isBotTyping, error, isOnline, isSignedIn]);

  // for handling faqs menu on mouse down
  useEffect(() => {
    const handleFaqsMenu = ({ target }: MouseEvent) => {
      if (!questionsListRef.current?.contains(target as Node))
        setIsFaqsMenuActive(false);
    };
    document.addEventListener("mousedown", handleFaqsMenu);
    return () => {
      document.removeEventListener("mousedown", handleFaqsMenu);
    };
  }, [questionsListRef, isFaqsMenuActive]);

  // for rendering messages and faqs
  // with the help of useCallback, we can decrease the call of this useEffect
  // even if the invoked functions inside is in the dependencies
  useEffect(() => {
    try {
      console.time("Received conversation in");
      getConversationHistory();
    } catch (error) {
      console.log(error);
    } finally {
      console.timeEnd("Received conversation in");
    }
  }, [getConversationHistory]);

  return {
    isAtLatestChat,
    latestChat,
    questionsListRef,
    settings,
    setSettings,
    loading,
    setLoading,
    isFaqsMenuActive,
    setIsFaqsMenuActive,
    userMessage,
    setUserMessage,
    toggleSettings,
    conversation,
    sendMessageToBot,
    sendSuggestedQueryToBot,
  };
};

export default useChatbot;
