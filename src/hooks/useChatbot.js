import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";

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

// library
import { chatbot } from "../lib/bot/chatbot";
import { greet } from "../utils/greet";
import { depts, deptsAnswer } from "../lib/depts";

// hooks
import { useDebounce } from "./useDebounce";

// utils
import { hasSymbol, splitMessage } from "../utils/splitMessage";
import { verifiedUID } from "../utils/uid";
import { scrollInto } from "../utils/scrollInto";
import { sleep } from "../utils/sleep";
import useSound from "../hooks/useSound";

const uid = verifiedUID();

// firebase queries and references
const usersCollectionRef = collection(db, "users");
// for future use
// const userQuery = query(usersCollectionRef, orderBy("conversation", "asc"));

const faqsCollectionRef = collection(db, "FAQs");
const faqsQuery = query(faqsCollectionRef, orderBy("frequency", "desc"));

const useChatbot = () => {
  const { playMessageNotification } = useSound();
  const latestMessage = useRef();
  const faqsRef = useRef();
  const [settings, setSettings] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFaqsMenuActive, setIsFaqsMenuActive] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const toggleSettings = () => {
    setSettings(!settings);
    scrollInto(latestMessage);
  };

  const getChatHistory = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      onSnapshot(doc(usersCollectionRef, uid), (doc) => {
        doc.exists() && setConversation(doc.data().conversation);
      });
      if (data) setLoading(false);
    } catch (error) {
      if (error) setError(true);
      else if (!error) setError(false);
    }
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
        await sleep(1);
        const docUserId = doc(usersCollectionRef, uid);
        const verifiedDocUserId = await getDoc(docUserId);
        if (!verifiedDocUserId.exists()) {
          // creates a user with verified uid in users collection
          // then add this bot message to conversation array
          await setDoc(doc(usersCollectionRef, uid), {
            conversation: [
              {
                messageId: uuid(),
                message: deptsAnswer,
                role: "bot",
                depts: depts,
                timeSent: Timestamp.now(),
              },
            ],
          });
        }
        await updateDoc(doc(usersCollectionRef, uid), {
          conversation: arrayUnion({
            message: deptsAnswer,
            messageId: uuid(),
            role: "bot",
            depts: depts,
            timeSent: Timestamp.now(),
          }),
        });
        setBotIsTyping(false);
        getChatHistory();
        playMessageNotification();
        // THE ABOVE CODE BLOCKS ARE FOR HANDLING STATIC DEPARTMENT RESPONSES ONLY
        //
        //
        // STARTING HERE FROM "ELSE" HANDLES THE DYNAMIC RESPONSES FROM BOT
      } else {
        await sleep(1);
        const response = await fetch(chatbot.url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify({
            userQuery: message,
          }),
        });
        // data holds the answer and intent recognized
        const data = await response.json();
        // assign those to a variables
        // will improve this later
        const intentRecognizedByBot = data.response.intent;
        const botAnswer = data.response.answer;
        const botMessageInfo = {
          intent: intentRecognizedByBot,
          message: botAnswer,
          messageId: uuid(),
          role: "bot",
          timeSent: Timestamp.now(),
        };
        if (hasSymbol(botAnswer)) {
          const botHasMultipleMessage = splitMessage(botAnswer);
          botHasMultipleMessage.forEach(async (response, i) => {
            if (i == 1) {
              await sleep(1.5);
              setBotIsTyping(true);
              await sleep(1);
            }
            const docUserId = doc(usersCollectionRef, uid);
            const verifiedDocUserId = await getDoc(docUserId);
            if (!verifiedDocUserId.exists()) {
              // creates a user with verified uid in users collection
              // then add this bot message to conversation array
              await setDoc(doc(usersCollectionRef, uid), {
                conversation: [botMessageInfo],
              });
            }
            await updateDoc(doc(usersCollectionRef, uid), {
              conversation: arrayUnion(botMessageInfo),
            });
            setBotIsTyping(false);
            setIsFaqsMenuActive(false);
            getChatHistory();
            playMessageNotification();
          });
          return;
        }
        const docUserId = doc(usersCollectionRef, uid);
        const verifiedDocUserId = await getDoc(docUserId);
        if (!verifiedDocUserId.exists()) {
          // creates a user with verified uid in users collection
          // then add this bot message to conversation array
          await setDoc(doc(usersCollectionRef, uid), {
            conversation: [botMessageInfo],
          });
        }
        await updateDoc(doc(usersCollectionRef, uid), {
          conversation: arrayUnion(botMessageInfo),
        });
        setBotIsTyping(false);
        setIsFaqsMenuActive(false);
        getChatHistory();
        playMessageNotification();
      }
    } catch (catchedError) {
      console.log(catchedError);
      setBotIsTyping(false);
      setError(true);
    }
    if (error) {
      console.log(error);
      setError(false);
    }
  };

  // useDebounce(function to call, seconds to wait before you can call it again)
  // basically a cooldown
  const debouncedMessageToBot = useDebounce(getReplyFromBot, 1.5);

  const sendMessageToBot = async (event, message) => {
    const messageInfo = {
      message: message,
      messageId: uuid(),
      role: "user",
      timeSent: Timestamp.now(),
    };
    try {
      event.preventDefault();
      const res = doc(usersCollectionRef, uid);
      const data = await getDoc(res);
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
      getChatHistory();
      setUserMessage("");
      playMessageNotification();
      debouncedMessageToBot(message);
    } catch (catchedError) {
      if (catchedError) {
        setBotIsTyping(false);
        setError(true);
      }
    }
    if (error == true) setError(false);
  };

  const sendFaqToBot = async (message) => {
    const messageInfo = {
      message: message,
      messageId: uuid(),
      role: "user",
      timeSent: Timestamp.now(),
    };
    try {
      const res = doc(usersCollectionRef, uid);
      const data = await getDoc(res);
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
      setIsFaqsMenuActive(false);
      getChatHistory();
      playMessageNotification();
      debouncedMessageToBot(message);
    } catch (catchedError) {
      if (catchedError) {
        setBotIsTyping(false);
        setError(true);
      }
    }
    if (error == true) setError(false);
  };

  // for auto scrolling
  useEffect(() => {
    scrollInto(latestMessage);
  }, [conversation, botIsTyping, error]);

  // for rendering messages and faqs once
  useEffect(() => {
    getChatHistory();
    getFaqs();
  }, []);

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
  }, [userMessage]);

  // for bot to greet when the user talks to the bot for the first time
  useEffect(() => {
    getChatHistory();
    if (conversation.length == 0) {
      console.log("this ran");
      greet(uid);
    }
  }, []);

  console.log(`Total messages in this conversation: ${conversation.length}`);

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
    debouncedMessageToBot,
    latestMessage,
    usersCollectionRef,
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
    conversation,
    setConversation,
    faqs,
    setFaqs,
    toggleSettings,
    getChatHistory,
    getFaqs,
    getReplyFromBot,
    sendMessageToBot,
    sendFaqToBot,
    faqsQuery,
  };
};

export default useChatbot;
