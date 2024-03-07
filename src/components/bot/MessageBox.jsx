import React from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import Chat from "../ui/Chat";
import TextareaAutosize from "react-textarea-autosize";

const MessageBox = () => {
  return (
    <div
      id="message-ui"
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
      <section id="messages" className="px-4 mt-[100px]">
        <div className="ml-[150px]">
          <Chat
            message={"So you want to know my 100 reasons why I love Navia?"}
          />
        </div>
        <div className="flex items-center gap-2">
          <span id="chatbot-icon" className="text-2xl">
            <RiRobot2Fill />
          </span>
          <Chat message={"YES"} />
        </div>
      </section>
      <form
        action=""
        method=""
        className="w-full absolute bottom-0 flex justify-between items-center gap-4 px-6 py-4"
      >
        <TextareaAutosize
          name="chat"
          id="chat"
          className="px-4 py-3 w-full rounded-3xl border border-gray-400 focus:outline-1 focus:outline-gray-500"
          placeholder="Type here..."
        />
        <button
          onClick={(e) => e.preventDefault()}
          type="submit"
          id="send-chat"
          className="w-[50px] h-[50px] flex items-center justify-center text-2xl"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default MessageBox;
