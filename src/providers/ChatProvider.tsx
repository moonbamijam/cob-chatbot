import { useState, useEffect, useMemo, useRef } from "react";
import { ChatContext } from "@contexts/ChatContext";

const getInitialStates = () => {
  const chatHeadSize = parseInt(localStorage.getItem("chatHeadSize") || "");
  return chatHeadSize ? chatHeadSize : 200;
};

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isChatActive, setIsChatActive] = useState<boolean>(false);
  const [isSettingsActive, setIsSettingsActive] = useState<boolean>(false);
  const [chatHeadSize, setChatHeadSize] = useState<number>(getInitialStates);
  const chatHead = useRef<HTMLImageElement | null>(null);
  const ratingBoxRef = useRef<HTMLDivElement | null>(null);

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
    const handleMouseDown = ({ target }: MouseEvent) => {
      if (
        !chatHead.current?.contains(target as Node) &&
        !ratingBoxRef.current?.contains(target as Node)
      )
        setIsChatActive(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    const escChat = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "escape") {
        setIsSettingsActive(false);
        setIsChatActive(false);
      }
    };
    document.addEventListener("keyup", escChat);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keyup", escChat);
    };
  }, [chatHead]);

  const chatValue = useMemo(() => {
    return {
      active: { isChatActive, setIsChatActive },
      settings: { isSettingsActive, setIsSettingsActive },
      chatHeadSize: { chatHeadSize, setChatHeadSize },
      changeChatHeadSize: changeChatHeadSize,
      icon: chatHead,
      ratingBoxRef: ratingBoxRef,
    };
  }, [isChatActive, chatHeadSize, isSettingsActive]);

  return (
    <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
