import React, { MutableRefObject } from "react";

type ChatContextType = {
  active: {
    isChatActive: boolean;
    setIsChatActive: React.Dispatch<React.SetStateAction<boolean>>;
  };
  settings: {
    isSettingsActive: boolean;
    setIsSettingsActive: React.Dispatch<React.SetStateAction<boolean>>;
  };
  chatHeadSize: {
    chatHeadSize: number;
    setChatHeadSize: React.Dispatch<React.SetStateAction<number>>;
  };
  changeChatHeadSize: (value: number) => void;
  icon: MutableRefObject<HTMLImageElement | null>;
  ratingBoxRef: MutableRefObject<HTMLDivElement | null>;
};

export const ChatContext = React.createContext({} as ChatContextType);
