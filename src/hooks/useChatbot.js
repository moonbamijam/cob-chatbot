import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { verifiedUID } from "../utils/uid";

// contexts
import { ChatbotContext } from "../contexts/ChatbotContext";
import { AuthContext } from "../contexts/AuthContext";

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
import { useDebounce } from "./useDebounce";
import useSound from "./useSound";

// utils
import { smoothScrollInto } from "../utils/scrollInto";
import { greet } from "../utils/greet";
import useResponse from "./useResponse";

const uid = verifiedUID();

// firebase queries and references
const usersCollectionRef = collection(db, "users");
const faqsCollectionRef = collection(db, "FAQs");
const faqsQuery = query(faqsCollectionRef, orderBy("frequency", "desc"));

const useChatbot = () => {
  const { auth } = useContext(AuthContext);
  const [isSignedIn] = auth.user;
  const { chatbot } = useContext(ChatbotContext);
  const [configuration] = chatbot.configuration;
  const [conversation, setConversation] = chatbot.conversation;
  const [faqs, setFaqs] = chatbot.faqs;
  const [error, setError] = chatbot.error;
  const [isOnline] = chatbot.online;
  const { playMessageNotification } = useSound();
  const { getReplyFromBot } = useResponse();
  const latestChat = useRef();
  const [isAtLatestChat, setIsAtLatestChat] = useState(false);
  const faqsRef = useRef();
  const [settings, setSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFaqsMenuActive, setIsFaqsMenuActive] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [botIsTyping, setBotIsTyping] = useState(false);

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
      const data = await getDocs(faqsQuery);
      setFaqs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error);
      if (!error) setError(false);
    }
  }, [setError, setFaqs]);

  // useDebounce(function to call, seconds to wait before you can call it again)
  // basically a cooldown
  const debouncedMessageToBot = useDebounce(getReplyFromBot, 1.5);

  const sendMessageToBot = useCallback(
    async (event, message) => {
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
        debouncedMessageToBot(message);
      } catch (error) {
        console.log(error);
        setBotIsTyping(false);
        setError(true);
        if (!error) setError(false);
      }
    },
    [debouncedMessageToBot, playMessageNotification, setError],
  );

  const sendFaqToBot = async (message) => {
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
      debouncedMessageToBot(message);
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
    const handleSendMessageInEnter = (event) => {
      const trimmedMessage = userMessage.trim();
      // message should be sent if its enter key without shift and not empty
      if (event.keyCode == 13 && !event.shiftKey && !trimmedMessage == "") {
        sendMessageToBot(event, trimmedMessage);
      } else if (event.keyCode == 13 && !event.shiftKey) {
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
    const handleFaqsMenu = (event) => {
      if (!faqsRef.current?.contains(event.target)) setIsFaqsMenuActive(false);
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
    console.log("Getting conversation and faqs...");
    getConversationHistory();
    getFaqs();
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
