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

// constants
import {
  depts,
  deptsAnswer,
  deptsMessages,
} from "@features/department/constants/depts";

// db
import {
  getDocs,
  Timestamp,
  query,
  orderBy,
  doc,
  setDoc,
  arrayUnion,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

// hooks
import useSound from "@hooks/useSound";

// lib
import { greet } from "@lib/greet";

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
import { chatType } from "@shared/ts/type";
import { images, videos, files } from "@shared/file-extensions";
import { faqsCollectionRef, usersCollectionRef } from "@shared/collection-refs";
import { UserContext } from "../contexts/UserContext";
import { userPost } from "../lib/user";

const faqsQuery = query(faqsCollectionRef, orderBy("frequency", "desc"));

const useChatbot = () => {
  const auth = useContext(AuthContext);
  const { isSignedIn } = auth.user;
  const user = useContext(UserContext);
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;
  const { conversation, setConversation } = chatbot.conversation;
  const { faqs, setFaqs } = chatbot.faqs;
  const { error, setError } = chatbot.error;
  const { isOnline } = chatbot.isOnline;
  const { playMessageNotification } = useSound();
  const latestChat = useRef<HTMLDivElement | null>(null);
  const [isAtLatestChat, setIsAtLatestChat] = useState<boolean>(false);
  const faqsRef = useRef<HTMLDivElement | null>(null);
  const [settings, setSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFaqsMenuActive, setIsFaqsMenuActive] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const [botIsTyping, setBotIsTyping] = useState<boolean>(false);

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

  const getFaqs = useCallback(async () => {
    try {
      const faqs = await getDocs(faqsQuery);
      setFaqs(faqs.docs.map((faq) => ({ ...faq.data(), id: faq.id })));
    } catch (error) {
      console.log(error);
      if (!error) setError(false);
    }
  }, [setError, setFaqs]);

  const getReplyFromBot = async (message: string) => {
    try {
      console.time(`${configuration.name} Replied in`);
      setBotIsTyping(true);
      // Temporary statements just to display departments
      if (deptsMessages.includes(message)) {
        await sleep(1);
        setBotIsTyping(false);
        const docUserId = doc(usersCollectionRef, user.uid);
        const verifiedDocUserId = await getDoc(docUserId);
        const botDepartmentChat: chatType = {
          chat: deptsAnswer,
          chatId: uuid(),
          role: "bot",
          depts: depts,
          timestamp: Timestamp.now(),
        };
        if (!verifiedDocUserId.exists()) {
          // creates a user with verified uid in users collection
          // then add this bot message to conversation array
          await setDoc(doc(usersCollectionRef, user.uid), {
            userData: {
              uid: user.uid,
              conversation: [{ botDepartmentChat }],
            },
          });
        }
        await updateDoc(doc(usersCollectionRef, user.uid), {
          conversation: arrayUnion(botDepartmentChat),
        });
        playMessageNotification();
        // THE ABOVE CODE BLOCKS ARE FOR HANDLING STATIC DEPARTMENT RESPONSES ONLY
        //
        //
        // STARTING HERE FROM "ELSE" HANDLES THE DYNAMIC RESPONSES FROM BOT
      } else {
        await sleep(1);
        const response = await fetch(import.meta.env.VITE_CHATBOT_API_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: import.meta.env.VITE_CHATBOT_API_KEY,
          },
          body: JSON.stringify({
            userQuery: message,
          }),
        });

        if (response.ok) setError(false);
        else setError(true);

        const data: {
          success: boolean;
          response: {
            answer: string;
            intent: string;
          };
        } = await response.json();
        const { intent, answer } = data.response;

        if (hasSplitSymbol(answer)) {
          const botHasMultipleMessage = splitMessage(answer);
          botHasMultipleMessage.forEach(async (response: string, i: number) => {
            if (i == 1) {
              await sleep(1);
              setBotIsTyping(true);
              await sleep(1);
            }
            chatData = {
              intent: intent,
              chat: response,
              chatId: uuid(),
              role: "bot",
              timestamp: Timestamp.now(),
            };
            setBotIsTyping(false);
            userPost(user.uid, chatData);
            setIsFaqsMenuActive(false);
            playMessageNotification();
          });
          return;
        } else if (hasLinkSymbol(answer)) {
          const { link, linkMessage, text } = extractLink(answer);
          const withLinkResponse: string[] = link ? [text, link] : [];

          withLinkResponse.forEach(async (response: string, i: number) => {
            if (i == 1) {
              await sleep(1);
              setBotIsTyping(true);
              await sleep(1);
            }
            if (response === text) {
              chatData = {
                intent: intent,
                chat: response,
                chatId: uuid(),
                role: "bot",
                timestamp: Timestamp.now(),
              };
            } else {
              chatData = {
                intent: intent,
                chat: null,
                chatId: uuid(),
                link: response,
                linkMessage: linkMessage ? linkMessage : "Click here",
                role: "bot",
                timestamp: Timestamp.now(),
              };
            }
            setBotIsTyping(false);
            userPost(user.uid, chatData);
            setIsFaqsMenuActive(false);
            playMessageNotification();
          });
        } else if (hasFileSymbol(answer)) {
          const { text, link } = extractLink(answer);
          const fileName = link ? extractFileNameFromUrl(link) : "";
          const fileExtension = fileName?.split(".")[1];

          const withFileResponse: string[] = link ? [text, link] : [];

          withFileResponse.forEach(async (response: string, i: number) => {
            if (i == 1) {
              await sleep(1);
              setBotIsTyping(true);
              await sleep(1);
            }
            if (fileExtension && images.includes(fileExtension)) {
              if (response === text) {
                chatData = {
                  intent: intent,
                  chat: response,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              } else {
                chatData = {
                  intent: intent,
                  image: response,
                  chat: null,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              }
            } else if (fileExtension && videos.includes(fileExtension)) {
              if (response === text) {
                chatData = {
                  intent: intent,
                  chat: response,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              } else {
                chatData = {
                  intent: intent,
                  video: response,
                  chat: null,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              }
            } else if (fileExtension && files.includes(fileExtension)) {
              if (response === text) {
                chatData = {
                  intent: intent,
                  chat: response,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              } else {
                chatData = {
                  intent: intent,
                  file: fileName,
                  fileLink: response,
                  fileType: fileExtension,
                  chat: null,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              }
            }
            setBotIsTyping(false);
            userPost(user.uid, chatData);
            setIsFaqsMenuActive(false);
            playMessageNotification();
          });
        } else if (intent === "None") {
          chatData = {
            intent: intent,
            chat: configuration.errorMessage,
            chatId: uuid(),
            role: "bot",
            timestamp: Timestamp.now(),
          };
          setBotIsTyping(false);
          userPost(user.uid, chatData);
          setIsFaqsMenuActive(false);
          playMessageNotification();
        } else {
          chatData = {
            intent: intent,
            chat: answer,
            chatId: uuid(),
            role: "bot",
            timestamp: Timestamp.now(),
          };
          setBotIsTyping(false);
          userPost(user.uid, chatData);
          setIsFaqsMenuActive(false);
          playMessageNotification();
        }
      }
    } catch (error) {
      console.log(error);
      setBotIsTyping(false);
      setError(true);
      if (!error) setError(false);
    } finally {
      console.timeEnd(`${configuration.name} Replied in`);
    }
  };

  const sendMessageToBot = useCallback(
    async (
      event: KeyboardEvent | FormEvent<HTMLInputElement | HTMLFormElement>,
      message: string,
    ) => {
      try {
        event.preventDefault();
        setUserMessage("");
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
        setBotIsTyping(false);
        setError(true);
        if (!error) setError(false);
      }
    },
    [playMessageNotification, setError],
  );

  const sendFaqToBot = async (message: string) => {
    try {
      setIsFaqsMenuActive(false);
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
      setBotIsTyping(false);
      setError(true);
      if (!error) setError(false);
    }
  };

  // for auto scrolling
  useEffect(() => {
    const atLatestChat = smoothScrollInto(latestChat);
    if (isSignedIn && atLatestChat) setIsAtLatestChat(true);
  }, [conversation, botIsTyping, error, isOnline, isSignedIn]);

  // for sending messages when clicking enter
  useEffect(() => {
    const handleSendMessageInEnter = (
      event: KeyboardEvent | FormEvent<HTMLInputElement>,
    ) => {
      const trimmedMessage = userMessage.trim();
      // message should be sent if its enter key without shift and not empty
      if (
        (event as KeyboardEvent).key == "Enter" &&
        !(event as KeyboardEvent).shiftKey &&
        trimmedMessage != ""
      ) {
        sendMessageToBot(event as KeyboardEvent, trimmedMessage);
        setUserMessage("");
      } else if (
        (event as KeyboardEvent).key == "Enter" &&
        !(event as KeyboardEvent).shiftKey
      ) {
        // this will just clear the spaces if you try to send empty messages using shift + enter
        event.preventDefault();
        setUserMessage("");
      }
    };
    document.addEventListener("keydown", handleSendMessageInEnter);
    return () => {
      document.removeEventListener("keydown", handleSendMessageInEnter);
    };
  }, [sendMessageToBot, userMessage]);

  // for handling faqs menu on mouse down
  useEffect(() => {
    const handleFaqsMenu = ({ target }: MouseEvent) => {
      if (!faqsRef.current?.contains(target as Node))
        setIsFaqsMenuActive(false);
    };
    document.addEventListener("mousedown", handleFaqsMenu);
    return () => {
      document.removeEventListener("mousedown", handleFaqsMenu);
    };
  }, [faqsRef, isFaqsMenuActive]);

  // for rendering messages and faqs
  // with the help of useCallback, we can decrease the call of this useEffect
  // even if the invoked functions inside is in the dependencies
  useEffect(() => {
    try {
      console.time("Received conversation and faqs in");
      getConversationHistory();
      getFaqs();
    } catch (error) {
      console.log(error);
    } finally {
      console.timeEnd("Received conversation and faqs in");
    }
  }, [getConversationHistory, getFaqs]);

  return {
    isAtLatestChat,
    latestChat,
    faqsRef,
    settings,
    setSettings,
    loading,
    setLoading,
    isFaqsMenuActive,
    setIsFaqsMenuActive,
    userMessage,
    setUserMessage,
    botIsTyping,
    setBotIsTyping,
    toggleSettings,
    conversation,
    faqs,
    getFaqs,
    sendMessageToBot,
    sendFaqToBot,
  };
};

export default useChatbot;
