import React from "react";
import { ConfigurationType, ConversationType } from "@/src/shared/ts/type";

type ChatbotContextType = {
  configuration: {
    configuration: ConfigurationType;
    setConfiguration: React.Dispatch<React.SetStateAction<ConfigurationType>>;
  };
  conversation: {
    conversation: ConversationType[];
    setConversation: React.Dispatch<React.SetStateAction<ConversationType[]>>;
  };
  error: {
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isOnline: {
    isOnline: boolean;
    setOnline: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isTyping: {
    isBotTyping: boolean;
    setIsBotTyping: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isChatPaused: {
    isChatPaused: boolean;
    setIsChatPaused: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export const ChatbotContext = React.createContext<ChatbotContextType>(
  {} as ChatbotContextType,
);
