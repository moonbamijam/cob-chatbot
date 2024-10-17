import { useState, useEffect, useMemo, useRef } from "react";
import { ChatContext } from "@contexts/ChatContext";

const getInitialStates = () => {
  const chatHeadSize = parseInt(localStorage.getItem("chatHeadSize") || "");
  return chatHeadSize ? chatHeadSize : 200;
};

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [chatHeadSize, setChatHeadSize] = useState(getInitialStates);
  const chatHead = useRef<HTMLImageElement | null>(null);

  const changeChatHeadSize = (value: number) => {
    switch (value) {
      case 100:
        setChatHeadSize(value);
        break;
      case 200:
        setChatHeadSize(value);
        break;
      case 300:
        setChatHeadSize(value);
        break;
    }
  };

  // listener
  useEffect(() => {
    localStorage.setItem("chatHeadSize", chatHeadSize.toString());
  }, [chatHeadSize]);

  // handles the mouse down for chat
  useEffect(() => {
    const handleChatHead = ({ target }: MouseEvent) => {
      if (!chatHead.current?.contains(target as Node)) setIsChatActive(false);
    };
    document.addEventListener("mousedown", handleChatHead);
    return () => {
      document.removeEventListener("mousedown", handleChatHead);
    };
  }, [chatHead]);

  const chatValue = useMemo(() => {
    return {
      active: { isChatActive, setIsChatActive },
      chatHeadSize: { chatHeadSize, setChatHeadSize },
      changeChatHeadSize: changeChatHeadSize,
      icon: chatHead,
    };
  }, [isChatActive, setIsChatActive, chatHeadSize, setChatHeadSize]);

  return (
    <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
