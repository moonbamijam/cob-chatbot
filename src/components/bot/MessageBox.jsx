import { useEffect, useRef, useState } from "react";
import { db } from "../../utils/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import TextareaAutosize from "react-textarea-autosize";

// Libraries
import { chatbot } from "../../libs/bot-details";
import { timeDisplay } from "../../utils/time-display";

// Utilities
import { sleep } from "../../utils/sleep";

// Components
import Chat from "../common/Chat";
import Typing from "../ui/Typing";

// Icons
import { IoSend } from "react-icons/io5";
import Loading from "../ui/Loading";

const MessageBox = () => {
  const scrollIntoNewChat = useRef();

  const [loading, setLoading] = useState(true);
  const [userMessage, setUserMessage] = useState("");
  const [botMessage, setBotMessage] = useState("initial text");
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  const messagesCollectionRef = collection(db, "messages");
  const q = query(messagesCollectionRef, orderBy("timeSent", "asc"));

  const getReplyFromBot = async (message) => {
    setBotIsTyping(true);
    await sleep(3);
    const response = await fetch(
      `http://localhost:3001/bot?message=${encodeURIComponent(message)}`
    );
    const data = await response.json();
    setBotIsTyping(false);
    await addDoc(messagesCollectionRef, {
      text: data,
      role: "bot",
      timeSent: Timestamp.now(),
    });
    setBotMessage(data)
  };

  const sendMessageToBot = async (event, message) => {
    event.preventDefault();
    setUserMessage("");
    await addDoc(messagesCollectionRef, {
      text: userMessage,
      role: "user",
      timeSent: Timestamp.now(),
    });
    await sleep(1.5);
    await getReplyFromBot(message);
  };

  const getChatHistory = async () => {
    const data = await getDocs(q);
    setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  useEffect(() => {
    scrollIntoNewChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botIsTyping]);

  useEffect(() => {
    getChatHistory();
  }, [userMessage, botMessage]);

  return (
    <div
      id="message-box"
      className="fixed flex flex-col right-10 bottom-24 sm:right-20 lg:right-28 lg:bottom-32 w-[400px] sm:w-[500px] h-[600px] sm:h-[700px] bg-white rounded-lg overflow-hidden z-[100]"
    >
      <header
        id="chat-ui-header"
        className="w-full flex items-center justify-between px-8 py-4 mr-auto shadow-md"
      >
        <div className="flex items-center gap-4">
          <img
            src={chatbot.logo}
            alt=""
            width={45}
            height={45}
            className="rounded-full border border-black"
          />
          <h3 className="text-2xl capitalize font-semibold">{chatbot.name}</h3>
        </div>
        <p id="timenow" className="text-lg">
          {timeDisplay()}
        </p>
      </header>
      <section
        id="messages"
        className="px-4 py-6 w-full h-full overflow-y-scroll scroll-ml-6 no-scrollbar"
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
                message={message.text}
                timeSent={new Date(message.timeSent.seconds * 1000)
                  .toLocaleTimeString()
                  .replace(/(.*)\D\d+/, "$1")}
              />
            ))}
            {botIsTyping && <Typing />}
          </div>
        )}
        <div ref={scrollIntoNewChat}></div>
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
