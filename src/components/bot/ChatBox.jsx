import { useContext, useEffect, useRef, useState } from "react";
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

// Contexts & Providers
import { LargeScreenContext } from "../../providers/LargeScreenProvider";
import InternetProvider from "../../providers/InternetProvider";

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
import BackBtn from "./buttons/BackBtn";
import CloseChatBtn from "./buttons/CloseChatBtn";

// Icons
import { IoSend } from "react-icons/io5";

const uid = verifiedUID();

const ChatBox = ({ className, closeUsing }) => {
  const [isLargeScreen, setIsLargeScreen] = useContext(LargeScreenContext);
  const latestMessage = useRef();
  const faqsWrapper = useRef();
  const [settings, setSettings] = useState(false);
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
  const hasSymbol = (str) => /@=@/.test(str);
  let botHasMultipleMessage = null;

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
      const botMessage = data.answer;
      if (hasSymbol(data.answer)) {
        botHasMultipleMessage = botMessage.split("@=@");
      }
      setBotIsTyping(false);
      if (botHasMultipleMessage) {
        botHasMultipleMessage.forEach(async (response, i) => {
          if (i == 1) {
            await sleep(1.5);
            setBotIsTyping(true);
            await sleep(3);
          }
          await addDoc(messagesCollectionRef, {
            message: response,
            role: "bot",
            timeSent: Timestamp.now(),
            uid: uid,
          });
          setBotIsTyping(false);
          setBotMessage(response);
        });
        return;
      }
      await addDoc(messagesCollectionRef, {
        message: botMessage,
        role: "bot",
        timeSent: Timestamp.now(),
        uid: uid,
      });
      setBotMessage(message);
    } catch (error) {
      setError(true);
      console.log(error);
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
        message: message,
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
    const data = await getDocs(messagesQuery);
    try {
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  const getFaqs = async () => {
    const data = await getDocs(faqsQuery);
    try {
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

  useEffect(() => {
    const handleSendMessageInEnter = (event) => {
      if (event.keyCode == 13 && !event.shiftKey && !userMessage == "")
        sendMessageToBot(event, userMessage);
    };
    document.addEventListener("keydown", handleSendMessageInEnter);
    return () => {
      document.removeEventListener("keydown", handleSendMessageInEnter);
    };
  }, [userMessage]);

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
      } fixed flex flex-col right-36 bottom-32 bg-white dark:bg-gray-800 rounded-xl overflow-hidden z-[100] ${className}`}
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
          <CloseChatBtn onClick={closeUsing} />
        </menu>
      </header>
      <section
        id="messages"
        className={`${
          settings ? "-translate-x-full hidden" : ""
        } w-full h-full px-4 py-6 overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500 hover:scrollbar-thumb-highlight`}
      >
        <MiniProfile state={settings} />
        <InternetProvider>
          {loading ? (
            <Loading />
          ) : (
            <div>
              {messages.map((message, id) => (
                <Chat
                  key={id}
                  role={message.role}
                  message={message.message}
                  timeSent={new Date(message.timeSent.seconds * 1000)
                    .toLocaleTimeString()
                    .replace(/(.*)\D\d+/, "$1")}
                />
              ))}
              {botIsTyping && <Typing />}
            </div>
          )}
          {error && <Error message={"something went wrong!"} />}
        </InternetProvider>
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
        } w-full h-[80px] px-4 flex items-center space-x-4 whitespace-nowrap overflow-x-scroll overflow-y-hidden no-scrollbar`}
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
        onSubmit={(e) => sendMessageToBot(e, userMessage)}
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
        <div
          className={`${
            settings ? "" : ""
          } px-4 py-6 overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500 hover:scrollbar-thumb-highlight`}
        >
          <MiniProfile state={settings} />
          <SettingsTitle text={"change theme"} />
          <ThemeSwitchBtn />
          <SettingsTitle text={"change font size"} />
          <FontSizes />
          <BackBtn onClick={() => toggleSettings()} text={"back"} />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
