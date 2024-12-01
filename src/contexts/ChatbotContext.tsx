import React from "react";
import {
  ConfigurationType,
  ConversationType,
  suggestedQueriesType,
} from "@/src/shared/ts/type";

type ChatbotContextType = {
  configuration: {
    configuration: ConfigurationType;
    setConfiguration: React.Dispatch<React.SetStateAction<ConfigurationType>>;
  };
  conversation: {
    conversation: ConversationType[];
    setConversation: React.Dispatch<React.SetStateAction<ConversationType[]>>;
  };
  menuAccessQuery: {
    menuAccessQueries: suggestedQueriesType[];
    setMenuAccessQueries: React.Dispatch<
      React.SetStateAction<suggestedQueriesType[]>
    >;
  };
  quickAccessQuery: {
    quickAccessQueries: suggestedQueriesType[];
    setQuickAccessQueries: React.Dispatch<
      React.SetStateAction<suggestedQueriesType[]>
    >;
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
