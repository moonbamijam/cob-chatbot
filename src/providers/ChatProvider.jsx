import { useState, useEffect, useMemo, useRef } from "react";
import { ChatContext } from "../contexts/ChatContext";

const ChatProvider = ({ children }) => {
  const [isChatActive, setIsChatActive] = useState(false);
  const chatHead = useRef();

  useEffect(() => {
    const handleChatHead = (event) => {
      if (!chatHead.current?.contains(event.target)) setIsChatActive(false);
    };
    document.addEventListener("mousedown", handleChatHead);
    return () => {
      document.removeEventListener("mousedown", handleChatHead);
    };
  }, [chatHead]);

  const chatValue = useMemo(() => {
    return {
      chat: {
        active: [isChatActive, setIsChatActive],
        icon: chatHead,
      },
    };
  }, [isChatActive, setIsChatActive]);

  return (
    <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
