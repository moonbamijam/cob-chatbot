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
import Chat from "../common/Chat";
import Typing from "../ui/Typing";
import Loading from "../ui/Loading";
import SuggestedQuestionBtn from "../buttons/SuggestedQuestionBtn";
import MaximizeBtn from "../buttons/MaximizeBtn";
import Error from "../ui/Error";

// Icons
import { IoSend } from "react-icons/io5";

const uid = verifiedUID();

const MessageBox = () => {
  const latestMessage = useRef();
  const faqsWrapper = useRef();

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
      className={`${
        isLargeScreen ? "w-[1200px] h-[750px]" : "w-[500px] h-[700px]"
      } fixed flex flex-col right-10 bottom-24 sm:right-20 lg:right-28 lg:bottom-32 bg-white rounded-lg overflow-hidden z-[100]`}
    >
      <header
        id="chat-ui-header"
        className="w-full flex items-center justify-between px-8 py-4 mr-auto shadow-md"
      >
        <div className="w-[150px] flex items-center gap-4">
          <img
            src={chatbot.logo}
            alt=""
            width={45}
            height={45}
            className="rounded-full border border-black"
          />
          <h3 className="text-2xl capitalize font-semibold">{chatbot.name}</h3>
        </div>
        <menu className="w-[150px] flex justify-end">
          <MaximizeBtn
            onClick={() => toggleLargeScreen()}
            state={isLargeScreen}
          />
        </menu>
      </header>
      <section
        id="messages"
        className="w-full h-full px-4 pt-6 overflow-y-scroll no-scrollbar"
      >
        <div id="bot-profile" className="flex flex-col items-center mb-8">
          <img
            src={chatbot.logo}
            alt=""
            width={100}
            height={100}
            className="rounded-full border border-black mb-2"
          />
          <div id="details" className="text-center mb-4">
            <h1 className="font-bold text-4xl mb-1">{chatbot.name}</h1>
            <p className="">{chatbot.slogan}</p>
          </div>
          <hr className="w-full" />
        </div>
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
        style={{ background: "white" }}
        id="suggested-questions"
        className="relative w-full h-[80px] px-4 pt-2 flex items-center space-x-4 whitespace-nowrap overflow-x-scroll overflow-y-hidden no-scrollbar"
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
        className="w-full flex justify-between items-center gap-2 px-4 py-2"
      >
        <TextareaAutosize
          name="chat"
          id="chat"
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          className="px-4 py-3 w-full rounded-3xl border border-gray-400 outline-1 focus:outline-blue-500"
          placeholder="Type here..."
        />
        <button
          type="submit"
          disabled={!userMessage}
          className="p-4 rounded-full flex items-center justify-center text-2xl hover:bg-gray-200 cursor-pointer"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default MessageBox;
