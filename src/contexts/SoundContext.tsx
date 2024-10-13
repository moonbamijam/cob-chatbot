import React from "react";

type SoundContextType = {
  chatSent: {
    chatSentSound: string;
    setChatSentSound: React.Dispatch<React.SetStateAction<string>>;
  };
};

export const SoundContext = React.createContext({} as SoundContextType);
