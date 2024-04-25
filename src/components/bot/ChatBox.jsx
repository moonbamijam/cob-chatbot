import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";

// Contexts & Providers
import { LargeScreenContext } from "../../providers/LargeScreenProvider";

// Libraries
import { depts, deptsAnswer } from "../../lib/depts";
import { greet } from "../../lib/greet";

// Utilities
import { sleep } from "../../utils/sleep";
import { scrollInto } from "../../utils/scroll-into";
import { verifiedUID } from "../../utils/uid";
import { hasSymbol, splitMessage } from "../../utils/split-message";

// Components
import Messages from "./sections/Messages";
import Header from "./header/Header";
import SuggestedQuestions from "./sections/SuggestedQuestions";
import MessageInput from "./input/MessageInput";
import Settings from "./sections/Settings";

const uid = verifiedUID();
const messagesCollectionRef = collection(db, "messages");
const messagesQuery = query(
  messagesCollectionRef,
  orderBy("timeSent", "asc"),
  where("uid", "==", uid)
);

const faqsCollectionRef = collection(db, "FAQs");
const faqsQuery = query(faqsCollectionRef, orderBy("frequency", "desc"));

const ChatBox = ({ className, closeUsing }) => {
  const [isLargeScreen, setIsLargeScreen] = useContext(LargeScreenContext);
  const latestMessage = useRef();
  const faqsWrapper = useRef();
  const [settings, setSettings] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userMessage, setUserMessage] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const toggleLargeScreen = () => {
    setIsLargeScreen(!isLargeScreen);
    scrollInto(latestMessage);
  };

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
      setError(true);
    }
  };

  const getFaqs = async () => {
    try {
      const data = await getDocs(faqsQuery);
      faqs.concat(faqs);
      setFaqs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      setError(true);
    }
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
        await sleep(3);
        await addDoc(messagesCollectionRef, {
          message: deptsAnswer,
          role: "bot",
          depts: depts,
          timeSent: Timestamp.now(),
          uid: uid,
        });
        setBotIsTyping(false);
        setBotMessage(deptsAnswer);
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
            setBotMessage(response);
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
        setBotMessage(botResponse);
        getChatHistory();
      }
    } catch (error) {
      setError(true);
    }
  };

  const sendMessageToBot = async (event, message) => {
    event.preventDefault();
    try {
      await addDoc(messagesCollectionRef, {
        message: message,
        role: "user",
        timeSent: Timestamp.now(),
        uid: uid,
      });
      getChatHistory();
      setUserMessage("");
      await sleep(1.5);
      await getReplyFromBot(message);
    } catch (error) {
      setError(true);
    }
  };

  const sendFaqToBot = async (message) => {
    try {
      setUserMessage(message);
      await addDoc(messagesCollectionRef, {
        message: message,
        role: "user",
        timeSent: Timestamp.now(),
        uid: uid,
      });
      getChatHistory();
      setUserMessage("");
      await sleep(1.5);
      await getReplyFromBot(message);
    } catch (error) {
      setError(true);
    }
  };

  // for auto scrolling
  useEffect(() => {
    scrollInto(latestMessage);
  }, [messages, botIsTyping]);

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
      greet(uid, setBotMessage);
      getChatHistory();
    }
  }, [loading]);

  return (
    <div
      id="message-box"
      className={`${
        isLargeScreen
          ? "w-[700px] h-[750px] md:w-[750px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]"
          : "w-[500px] h-[700px]"
      } fixed flex flex-col right-36 bottom-32 bg-white dark:bg-gray-800 rounded-xl overflow-hidden z-[100] ${className}`}
    >
      <Header
        toggleSettings={toggleSettings}
        toggleLargeScreen={toggleLargeScreen}
        isLargeScreen={isLargeScreen}
        settings={settings}
        closeUsing={closeUsing}
      />
      <Messages
        settings={settings}
        loading={loading}
        messages={messages}
        botIsTyping={botIsTyping}
        error={error}
        latestMessage={latestMessage}
      />
      <SuggestedQuestions
        faqsWrapper={faqsWrapper}
        settings={settings}
        isLargeScreen={isLargeScreen}
        faqs={faqs}
        sendFaqToBot={sendFaqToBot}
      />
      <MessageInput
        sendMessageToBot={sendMessageToBot}
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        settings={settings}
      />
      {settings && (
        <Settings settings={settings} toggleSettings={toggleSettings} />
      )}
    </div>
  );
};

export default ChatBox;
