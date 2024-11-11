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
};

export const ChatbotContext = React.createContext<ChatbotContextType>(
  {} as ChatbotContextType,
);
