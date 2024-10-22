import {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  FormEvent,
} from "react";
import { v4 as uuid } from "uuid";
import { verifiedUID } from "@utils/uid";

// contexts
import { ChatbotContext } from "@contexts/ChatbotContext";
import { AuthContext } from "@contexts/AuthContext";

// library
import { depts, deptsAnswer, deptsMessages } from "@lib/depts";

// db
import {
  collection,
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
import { db } from "../firebase/config";

// hooks
import useSound from "./useSound";

// utils
import { sleep } from "@utils/sleep";
import {
  hasImageSymbol,
  hasSymbol,
  splitMessage,
} from "@src/utils/split-message";
import { smoothScrollInto } from "@src/utils/scroll-into";
import { greet } from "@utils/greet";
import { firestoreConverter } from "@utils/type-converter";
import { extractLink } from "@src/utils/split-link";
import { extractFileNameFromUrl } from "@src/utils/extract-file-name-from-url";

// shared
import { chatType, FaqType } from "@src/shared/ts/type";
import { docs, images, videos } from "@src/shared/file-extensions";

const uid = verifiedUID();

const usersCollectionRef = collection(db, "users");
const faqsCollectionRef = collection(db, "FAQs").withConverter(
  firestoreConverter<FaqType>(),
);
const faqsQuery = query(faqsCollectionRef, orderBy("frequency", "desc"));

const useChatbot = () => {
  const auth = useContext(AuthContext);
  const { isSignedIn } = auth.user;
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

  const toggleSettings = () => {
    setSettings(!settings);
    smoothScrollInto(latestChat);
  };

  const getConversationHistory = useCallback(async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      onSnapshot(doc(usersCollectionRef, uid), (doc) => {
        if (doc.exists()) setConversation(doc.data().conversation);
        // data in configuration will take time and we have to check if its there
        // this will prevent greet to get undefined 2nd argument that will cause error
        else if (!doc.exists() && configuration.initialGreet)
          greet(uid, configuration.initialGreet);
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
      setBotIsTyping(true);
      // Temporary statements just to display departments
      if (deptsMessages.includes(message)) {
        await sleep(1);
        setBotIsTyping(false);
        const docUserId = doc(usersCollectionRef, uid);
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
          await setDoc(doc(usersCollectionRef, uid), {
            conversation: [{ botDepartmentChat }],
          });
        }
        await updateDoc(doc(usersCollectionRef, uid), {
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

        // data holds the answer and intent recognized
        const data: {
          success: boolean;
          response: {
            answer: string;
            intent: string;
          };
        } = await response.json();
        const { intent, answer } = data.response;
        // assign those to a variables
        // will improve this later
        const intentRecognizedByBot = intent;
        const botAnswer = answer;

        let botChat: chatType = {
          chat: "",
          chatId: "",
          role: "",
          timestamp: Timestamp.now(),
        };

        if (hasSymbol(botAnswer)) {
          const botHasMultipleMessage = splitMessage(botAnswer);
          botHasMultipleMessage.forEach(async (response: string, i: number) => {
            if (i == 1) {
              await sleep(1);
              setBotIsTyping(true);
              await sleep(1);
            }
            botChat = {
              intent: intentRecognizedByBot,
              chat: response,
              chatId: uuid(),
              role: "bot",
              timestamp: Timestamp.now(),
            };
            setBotIsTyping(false);
            const docUserId = doc(usersCollectionRef, uid);
            const verifiedDocUserId = await getDoc(docUserId);
            if (!verifiedDocUserId.exists()) {
              // creates a user with verified uid in users collection
              // then add this bot message to conversation array
              await setDoc(doc(usersCollectionRef, uid), {
                conversation: [botChat],
              });
            }
            await updateDoc(doc(usersCollectionRef, uid), {
              conversation: arrayUnion(botChat),
            });
            setIsFaqsMenuActive(false);
            playMessageNotification();
          });
          return;
        } else if (hasImageSymbol(botAnswer)) {
          const { text, link } = extractLink(botAnswer);
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
                botChat = {
                  intent: intentRecognizedByBot,
                  chat: response,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              } else {
                botChat = {
                  intent: intentRecognizedByBot,
                  image: response,
                  chat: null,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              }
            } else if (fileExtension && videos.includes(fileExtension)) {
              if (response === text) {
                botChat = {
                  intent: intentRecognizedByBot,
                  chat: response,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              } else {
                botChat = {
                  intent: intentRecognizedByBot,
                  video: response,
                  chat: null,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              }
            } else if (fileExtension && docs.includes(fileExtension)) {
              if (response === text) {
                botChat = {
                  intent: intentRecognizedByBot,
                  chat: response,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              } else {
                botChat = {
                  intent: intentRecognizedByBot,
                  docs: fileName,
                  docsLink: response,
                  chat: null,
                  chatId: uuid(),
                  role: "bot",
                  timestamp: Timestamp.now(),
                };
              }
            }
            setBotIsTyping(false);
            const docUserId = doc(usersCollectionRef, uid);
            const verifiedDocUserId = await getDoc(docUserId);
            if (!verifiedDocUserId.exists()) {
              // creates a user with verified uid in users collection
              // then add this bot message to conversation array
              await setDoc(doc(usersCollectionRef, uid), {
                conversation: [botChat],
              });
            }
            await updateDoc(doc(usersCollectionRef, uid), {
              conversation: arrayUnion(botChat),
            });
            setIsFaqsMenuActive(false);
            playMessageNotification();
          });
        } else if (intentRecognizedByBot == "None") {
          botChat = {
            intent: intentRecognizedByBot,
            chat: configuration.errorMessage,
            chatId: uuid(),
            role: "bot",
            timestamp: Timestamp.now(),
          };
        } else {
          botChat = {
            intent: intentRecognizedByBot,
            chat: botAnswer,
            chatId: uuid(),
            role: "bot",
            timestamp: Timestamp.now(),
          };
          setBotIsTyping(false);
          const docUserId = doc(usersCollectionRef, uid);
          const verifiedDocUserId = await getDoc(docUserId);
          if (!verifiedDocUserId.exists()) {
            // creates a user with verified uid in users collection
            // then add this bot message to conversation array
            await setDoc(doc(usersCollectionRef, uid), {
              conversation: [botChat],
            });
          }
          await updateDoc(doc(usersCollectionRef, uid), {
            conversation: arrayUnion(botChat),
          });
          setIsFaqsMenuActive(false);
          playMessageNotification();
        }
      }
    } catch (error) {
      console.log(error);
      setBotIsTyping(false);
      setError(true);
      if (!error) setError(false);
    }
  };

  const sendMessageToBot = useCallback(
    async (
      event: KeyboardEvent | FormEvent<HTMLInputElement | HTMLFormElement>,
      message: string,
    ) => {
      const messageInfo = {
        message: message,
        messageId: uuid(),
        role: "user",
        timeSent: Timestamp.now(),
      };
      try {
        event.preventDefault();
        setUserMessage("");
        const res = doc(usersCollectionRef, uid);
        const data = await getDoc(res);
        playMessageNotification();
        if (!data.exists()) {
          // creates a user with verified uid in users collection
          // then adds a conversation field that will hold all of the user & bot messages
          await setDoc(doc(usersCollectionRef, uid), {
            conversation: [messageInfo],
          });
        }
        await updateDoc(doc(usersCollectionRef, uid), {
          conversation: arrayUnion(messageInfo),
        });
        await sleep(1.5);
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
    const messageInfo = {
      message: message,
      messageId: uuid(),
      role: "user",
      timeSent: Timestamp.now(),
    };
    try {
      setIsFaqsMenuActive(false);
      const res = doc(usersCollectionRef, uid);
      const data = await getDoc(res);
      playMessageNotification();
      if (!data.exists()) {
        // creates a user with verified uid in users collection
        // then adds a conversation field that will hold all of the user & bot messages
        await setDoc(doc(usersCollectionRef, uid), {
          conversation: [messageInfo],
        });
      }
      await updateDoc(doc(usersCollectionRef, uid), {
        conversation: arrayUnion(messageInfo),
      });
      await sleep(1.5);
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
