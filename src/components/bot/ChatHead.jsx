import React from "react";
import { IoClose } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";
import Ping from "../ui/Ping";

const ChatHead = ({ state, setState }) => {
  [state, setState];
  const toggleChat = () => {
    setState(!state);
  };
  return (
    <>
      <button
        onClick={toggleChat}
        id=""
        className="fixed right-8 bottom-8 lg:right-12 lg:bottom-12 rounded-full p-3 text-3xl lg:text-4xl bg-dummyhighlight text-white z-[100] "
      >
        {state ? (
          <IoClose />
        ) : (
          <>
            <Ping /> <RiRobot2Fill />
          </>
        )}
      </button>
    </>
  );
};

export default ChatHead;
