import { useEffect, useRef, useState } from "react";
import { db } from "../../utils/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import TextareaAutosize from "react-textarea-autosize";

// Libraries
import { chatbot } from "../../libs/bot-details";

// Utilities
import { sleep } from "../../utils/sleep";
import { scrollInto } from "../../utils/scroll-into";
import { verifiedUID } from "../../utils/uid";

// Components
import Chat from "./ui/Chat";
import Typing from "./ui/Typing";
import Loading from "./ui/Loading";
import SuggestedQuestionBtn from "./buttons/SuggestedQuestionBtn";
import MaximizeBtn from "./buttons/MaximizeBtn";
import Error from "./ui/Error";
import SettingsBtn from "./buttons/SettingsBtn";
import MiniProfile from "./sections/MiniProfile";
import SettingsTitle from "./ui/SettingsTitle";
import ThemeSwitchBtn from "./buttons/ThemeSwitchBtn";
import FontSizes from "./sections/FontSizes";

// Icons
import { IoSend } from "react-icons/io5";

const uid = verifiedUID();

const ChatBox = () => {
  const latestMessage = useRef();
  const faqsWrapper = useRef();
  const [settings, setSettings] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userMessage, setUserMessage] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const messagesCollectionRef = collection(db, "messages");
  const messagesQuery = query(
    messagesCollectionRef,
    orderBy("timeSent", "asc"),
    where("uid", "==", uid)
  );

  const faqsCollectionRef = collection(db, "FAQs");
  const faqsQuery = query(faqsCollectionRef, orderBy("frequency", "desc"));

  const toggleLargeScreen = () => {
    setIsLargeScreen(!isLargeScreen);
    scrollInto(latestMessage);
  };

  const toggleSettings = () => {
    setSettings(!settings);
    scrollInto(latestMessage);
  };

  const getReplyFromBot = async (message) => {
    try {
      setBotIsTyping(true);
      await sleep(3);
      const response = await fetch(
        `http://localhost:3001/bot?message=${encodeURIComponent(message)}`
      );
      const data = await response.json();
      setBotIsTyping(false);
      await addDoc(messagesCollectionRef, {
        messageInfo: data,
        role: "bot",
        timeSent: Timestamp.now(),
        uid: uid,
      });
      setBotMessage(data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const sendMessageToBot = async (event, message) => {
    event.preventDefault();
    try {
      await addDoc(messagesCollectionRef, {
        messageInfo: { answer: message },
        role: "user",
        timeSent: Timestamp.now(),
        uid: uid,
      });

      setUserMessage("");
      await sleep(1.5);
      await getReplyFromBot(message);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const sendFaqToBot = async (message) => {
    try {
      setUserMessage(message);
      await addDoc(messagesCollectionRef, {
        messageInfo: { answer: message },
        role: "user",
        timeSent: Timestamp.now(),
        uid: uid,
      });
      setUserMessage("");
      await sleep(1.5);
      await getReplyFromBot(message);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const getChatHistory = async () => {
    try {
      const data = await getDocs(messagesQuery);
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  const getFaqs = async () => {
    try {
      const data = await getDocs(faqsQuery);
      setFaqs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    scrollInto(latestMessage);
  }, [messages, botIsTyping]);

  useEffect(() => {
    getChatHistory();
    getFaqs();
  }, [userMessage, botMessage]);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - faqsWrapper.current.offsetLeft);
    setScrollLeft(faqsWrapper.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - faqsWrapper.current.offsetLeft;
    const walk = (x - startX) * 2;
    faqsWrapper.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      id="message-box"
      className={` ${
        isLargeScreen ? "w-[1200px] h-[750px]" : "w-[500px] h-[700px]"
      } fixed flex flex-col right-10 bottom-24 sm:right-20 lg:right-28 lg:bottom-32 bg-white dark:bg-gray-800 rounded-lg overflow-hidden z-[100]`}
    >
      <header
        id="chat-ui-header"
        className="w-full flex items-center justify-between px-8 py-4 mr-auto shadow-md "
      >
        <button
          onClick={() => toggleSettings()}
          id="chatbot-detai"
          className="flex items-center gap-4"
        >
          <img
            src={chatbot.logo}
            alt=""
            width={45}
            height={45}
            className="rounded-full"
          />
          <h3 className="text-2xl capitalize font-semibold dark:text-white">
            {chatbot.nickName}
          </h3>
        </button>
        <menu className="flex gap-1 justify-end">
          <MaximizeBtn
            onClick={() => toggleLargeScreen()}
            state={isLargeScreen}
          />
          <SettingsBtn onClick={() => toggleSettings()} state={settings} />
        </menu>
      </header>
      <section
        id="messages"
        className={`${
          settings ? "-translate-x-full hidden" : ""
        } w-full h-full px-4 pt-6 overflow-y-scroll no-scrollbar`}
      >
        <MiniProfile state={settings} />
        {loading ? (
          <Loading />
        ) : (
          <div>
            {messages.map((message, id) => (
              <Chat
                key={id}
                role={message.role}
                message={message.messageInfo.answer}
                timeSent={new Date(message.timeSent.seconds * 1000)
                  .toLocaleTimeString()
                  .replace(/(.*)\D\d+/, "$1")}
              />
            ))}
            {botIsTyping && <Typing />}
          </div>
        )}
        {error && <Error />}
        <div ref={latestMessage}></div>
      </section>
      <section
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={faqsWrapper}
        id="suggested-questions"
        className={`${
          settings ? "-translate-x-full hidden" : ""
        } w-full h-[80px] px-4 pt-2 flex items-center space-x-4 whitespace-nowrap overflow-x-scroll overflow-y-hidden no-scrollbar `}
      >
        {faqs.map((faq, id) => (
          <SuggestedQuestionBtn
            key={id}
            onClick={() => sendFaqToBot(faq.questions[0])}
            question={faq.questions[0]}
          />
        ))}
      </section>
      <form
        action=""
        method=""
        onSubmit={(e) => {
          sendMessageToBot(e, userMessage);
        }}
        className={`${
          settings ? "-translate-x-full hidden" : ""
        } w-full flex justify-between items-center gap-2 px-4 py-2`}
      >
        <TextareaAutosize
          name="chat"
          id="chat"
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          className="px-4 py-3 w-full rounded-3xl dark:text-white border border-gray-400 dark:border-transparent outline-none dark:bg-gray-700  dark:caret-white"
          placeholder="Type here..."
        />
        <button
          type="submit"
          disabled={!userMessage}
          className="p-4 rounded-full flex items-center justify-center active:translate-x-2 text-2xl text-blue-500 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
        >
          <IoSend />
        </button>
      </form>
      {settings && (
        <div className={`px-4 py-6 overflow-y-scroll no-scrollbar`}>
          <MiniProfile state={settings} />
          <SettingsTitle text={"change theme"} />
          <ThemeSwitchBtn />
          <SettingsTitle text={"change font size"} />
          <FontSizes />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
