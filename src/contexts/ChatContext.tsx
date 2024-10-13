import React, { MutableRefObject } from "react";

type ChatContextType = {
  active: {
    isChatActive: boolean;
    setIsChatActive: React.Dispatch<React.SetStateAction<boolean>>;
  };
  chatHeadSize: {
    chatHeadSize: number;
    setChatHeadSize: React.Dispatch<React.SetStateAction<number>>;
  };
  changeChatHeadSize: (value: number) => void;
  icon: MutableRefObject<HTMLImageElement | null>;
};

export const ChatContext = React.createContext({} as ChatContextType);
