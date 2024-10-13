import React from "react";
import { ConfigurationType, ConversationType, FaqType } from "../shared/type";

type ChatbotContextType = {
  configuration: {
    configuration: ConfigurationType;
    setConfiguration: React.Dispatch<React.SetStateAction<ConfigurationType>>;
  };

  conversation: {
    conversation: ConversationType[];
    setConversation: React.Dispatch<React.SetStateAction<ConversationType[]>>;
  };
  faqs: {
    faqs: FaqType[];
    setFaqs: React.Dispatch<React.SetStateAction<FaqType[]>>;
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
