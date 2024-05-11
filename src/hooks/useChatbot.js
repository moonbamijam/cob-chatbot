import { useState, useEffect, useRef } from "react";

// Database
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

// Library
import { greet } from "../utils/greet";
import { depts, deptsAnswer } from "../lib/depts";

// Utilities
import { hasSymbol, splitMessage } from "../utils/splitMessage";
import { verifiedUID } from "../utils/uid";
import { scrollInto } from "../utils/scrollInto";
import { sleep } from "../utils/sleep";
import {
  playMessageNotification,
  playTypingSound,
} from "../utils/soundNotifications";

const uid = verifiedUID();
const messagesCollectionRef = collection(db, "messages");
const messagesQuery = query(
  messagesCollectionRef,
  orderBy("timeSent", "asc"),
  where("uid", "==", uid)
);

const faqsCollectionRef = collection(db, "FAQs");
const faqsQuery = query(faqsCollectionRef, orderBy("frequency", "desc"));

const useChatbot = () => {
  const latestMessage = useRef();
  const faqsRef = useRef();
  const [settings, setSettings] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFaqsMenuActive, setIsFaqsMenuActive] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const toggleSettings = () => {
    setSettings(!settings);
    scrollInto(latestMessage);
  };

  const getChatHistory = async () => {
    try {
      const data = await getDocs(messagesQuery);
      messages.concat(messages);
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      if (data) setLoading(false);
    } catch (error) {
      if (error) setError(true);
    }
    if (error == true) setError(false);
  };

  const getFaqs = async () => {
    try {
      const data = await getDocs(faqsQuery);
      faqs.concat(faqs);
      setFaqs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      if (error) setError(true);
    }
    if (error == true) setError(false);
  };

  const getReplyFromBot = async (message) => {
    try {
      setBotIsTyping(true);
      playTypingSound();
      let deptMessage = message.toLowerCase();
      // Temporary statements just to display departments
      if (
        deptMessage === "departments" ||
        deptMessage === "department" ||
        deptMessage === "can you give me the list of departments?" ||
        deptMessage === "can you give me the list of departments" ||
        deptMessage === "can you give me the departments?" ||
        deptMessage === "can you give me the departments" ||
        deptMessage === "can you give me list of departments?" ||
        deptMessage === "can you give me list of departments" ||
        deptMessage === "departments list?" ||
        deptMessage === "departments list" ||
        deptMessage === "department list?" ||
        deptMessage === "department list" ||
        deptMessage === "list of departments" ||
        deptMessage === "list of department" ||
        deptMessage === "give me the list of deparments"
      ) {
        await sleep(3);
        await addDoc(messagesCollectionRef, {
          message: deptsAnswer,
          role: "bot",
          depts: depts,
          timeSent: Timestamp.now(),
          uid: uid,
        });
        setBotIsTyping(false);
        playMessageNotification();
        getChatHistory();
        // Above is all temporary
      } else {
        await sleep(3);
        const response = await fetch(
          `http://localhost:3001/bot?message=${encodeURIComponent(message)}`
        );
        const data = await response.json();
        const intentRecognizedByBot = data.intent;
        const botResponse = data.answer;
        if (hasSymbol(botResponse)) {
          const botHasMultipleMessage = splitMessage(botResponse);
          botHasMultipleMessage.forEach(async (response, i) => {
            if (i == 1) {
              await sleep(1.5);
              playTypingSound();
              setBotIsTyping(true);
              await sleep(3);
            }
            await addDoc(messagesCollectionRef, {
              intent: intentRecognizedByBot,
              message: response,
              role: "bot",
              timeSent: Timestamp.now(),
              uid: uid,
            });
            setBotIsTyping(false);
            playMessageNotification();
            setIsFaqsMenuActive(false);
            getChatHistory();
          });
          return;
        }
        setBotIsTyping(false);
        await addDoc(messagesCollectionRef, {
          intent: intentRecognizedByBot,
          message: botResponse,
          role: "bot",
          timeSent: Timestamp.now(),
          uid: uid,
        });
        playMessageNotification();
        setIsFaqsMenuActive(false);
        getChatHistory();
      }
    } catch (error) {
      if (error) setError(true);
    }
    if (error == true) setError(false);
  };

  const sendMessageToBot = async (event, message) => {
    try {
      event.preventDefault();
      await addDoc(messagesCollectionRef, {
        message: message,
        role: "user",
        timeSent: Timestamp.now(),
        uid: uid,
      });
      getChatHistory();
      setUserMessage("");
      playMessageNotification();
      await sleep(1.5);
      await getReplyFromBot(message);
    } catch (error) {
      if (error) setError(true);
    }
    if (error == true) setError(false);
  };

  const sendFaqToBot = async (message) => {
    try {
      await addDoc(messagesCollectionRef, {
        message: message,
        role: "user",
        timeSent: Timestamp.now(),
        uid: uid,
      });
      setIsFaqsMenuActive(false);
      getChatHistory();
      playMessageNotification();
      await sleep(1.5);
      await getReplyFromBot(message);
    } catch (error) {
      if (error) setError(true);
    }
    if (error == true) setError(false);
  };

  // for auto scrolling
  useEffect(() => {
    scrollInto(latestMessage);
  }, [messages, botIsTyping, error]);

  // for rendering messages and faqs once
  useEffect(() => {
    getChatHistory();
    getFaqs();
  }, []);

  // for sending messages when clicking enter
  useEffect(() => {
    const handleSendMessageInEnter = (event) => {
      const trimmedMessage = userMessage.trim();
      if (event.keyCode == 13 && !event.shiftKey && !trimmedMessage == "") {
        sendMessageToBot(event, trimmedMessage);
      } else if (event.keyCode == 13 && !event.shiftKey) {
        event.preventDefault();
        setUserMessage("");
      }
    };
    document.addEventListener("keydown", handleSendMessageInEnter);
    return () => {
      document.removeEventListener("keydown", handleSendMessageInEnter);
    };
  }, [userMessage]);

  // for bot to greet when the user talks to the bot for the first time
  useEffect(() => {
    if (!loading && messages.length === 0) {
      greet(uid);
      getChatHistory();
    }
  }, [loading]);

  // for handling faqs menu on mouse down
  useEffect(() => {
    const handleFaqsMenu = (event) => {
      if (!faqsRef.current?.contains(event.target)) setIsFaqsMenuActive(false);
    };
    document.addEventListener("mousedown", handleFaqsMenu);
    return () => {
      document.removeEventListener("mousedown", handleFaqsMenu);
    };
  }, [faqsRef, isFaqsMenuActive]);

  return {
    latestMessage,
    faqsRef,
    settings,
    setSettings,
    error,
    setError,
    loading,
    setLoading,
    isFaqsMenuActive,
    setIsFaqsMenuActive,
    userMessage,
    setUserMessage,
    botIsTyping,
    setBotIsTyping,
    messages,
    setMessages,
    faqs,
    setFaqs,
    toggleSettings,
    getChatHistory,
    getFaqs,
    getReplyFromBot,
    sendMessageToBot,
    sendFaqToBot,
    messagesQuery,
    faqsQuery,
  };
};

export default useChatbot;
