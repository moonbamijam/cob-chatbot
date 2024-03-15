import { RiRobot2Fill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import Chat from "../common/Chat";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";

const MessageBox = () => {
  const [botMessage, setBotMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const sendMessage = async (event, message) => {
    try {
      event.preventDefault();
      const response = await fetch(
        `http://localhost:3001/bot?message=${encodeURIComponent(message)}`
      );
      const data = await response.text();
      console.log("data: ", data);
      setBotMessage(data.toString());
      setUserMessage("");
    } catch (error) {
      console.log("failed: ", error);
    }
  };

  return (
    <div
      id="message-box"
      className="fixed right-10 bottom-24 sm:right-20 lg:right-28 lg:bottom-28 w-[400px] sm:w-[500px] h-[600px] sm:h-[700px] bg-white rounded-lg z-[100]"
    >
      <header
        id="chat-ui-header"
        className="flex items-center gap-4 px-8 py-4 mr-auto shadow-md"
      >
        <span className="text-3xl">
          <RiRobot2Fill />
        </span>
        <h3 className="text-2xl capitalize font-semibold">
          city of bacoor - chatbot
        </h3>
      </header>
      <section id="messages" className="px-4 w-full mt-[100px]">
        {userMessage && <Chat message={userMessage} />}
        {botMessage && <Chat isBot={true} message={botMessage} />}
      </section>
      <form
        action=""
        method=""
        onSubmit={(e) => sendMessage(e, userMessage)}
        className="w-full absolute bottom-0 flex justify-between items-center gap-2 px-4 py-4"
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
