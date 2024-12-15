import { useState, useEffect, useMemo } from "react";
import { doc, onSnapshot } from "firebase/firestore";

// firebase
import { profileCollectionRef } from "@shared/collection-refs";

// contexts
import { ChatbotContext } from "@contexts/ChatbotContext";

// types
import {
  ConfigurationType,
  ConversationType,
  suggestedQueriesType,
} from "@shared/ts/type";

// assets
import ChatbotLogo from "@static/assets/images/logo.png";

const ChatbotProvider = ({ children }: { children: React.ReactNode }) => {
  const [configuration, setConfiguration] = useState<ConfigurationType>({
    icon: ChatbotLogo,
    widgetIcon: ChatbotLogo,
    name: "",
    slogan: "",
  });
  const [conversation, setConversation] = useState<ConversationType[]>([]);
  const [menuAccessQueries, setMenuAccessQueries] = useState<
    suggestedQueriesType[]
  >([]);
  const [quickAccessQueries, setQuickAccessQueries] = useState<
    suggestedQueriesType[]
  >([]);
  const [isOnline, setOnline] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [isChatPaused, setIsChatPaused] = useState<boolean>(false);

  const getBotProfile = async () => {
    try {
      console.time("Received bot info in");
      onSnapshot(doc(profileCollectionRef, "botProfile"), (doc) => {
        setConfiguration({
          icon: doc.data()?.interactionIconURL,
          widgetIcon: doc.data()?.widgetIconUrl,
          name: doc.data()?.botName,
          slogan: doc.data()?.metadata.slogan,
          initialGreet: `👋 Hello there! My name is ${doc.data()?.botName}, your friendly chatbot assistant. Welcome to our conversation! Whether you're here for assistance or information I'm here to help. Feel free to ask me anything or simply say hi.`,
          errorMessage:
            "Sorry, I can't seem to understand what your saying. Could you please try it again?",
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.timeEnd("Received bot info in");
    }
  };

  const getSuggestedQueries = async () => {
    try {
      console.time("Received suggested queries");
      onSnapshot(doc(profileCollectionRef, "queries"), (doc) => {
        if (doc.exists()) {
          setMenuAccessQueries(doc.data()?.menuAccessQuery);
          setQuickAccessQueries(doc.data()?.quickAccessQuery);
        }
      });
      console.timeEnd("Received suggested queries");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setOnline(navigator.onLine);
    getBotProfile();
    getSuggestedQueries();
  }, []);

  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  const chatbot = useMemo(() => {
    return {
      configuration: { configuration, setConfiguration },
      conversation: { conversation, setConversation },
      menuAccessQuery: { menuAccessQueries, setMenuAccessQueries },
      quickAccessQuery: { quickAccessQueries, setQuickAccessQueries },
      error: { error, setError },
      isOnline: { isOnline, setOnline },
      isTyping: { isBotTyping, setIsBotTyping },
      isChatPaused: { isChatPaused, setIsChatPaused },
    };
  }, [
    configuration,
    conversation,
    menuAccessQueries,
    quickAccessQueries,
    error,
    isOnline,
    isBotTyping,
    isChatPaused,
  ]);

  return (
    <ChatbotContext.Provider value={chatbot}>
      {children}
    </ChatbotContext.Provider>
  );
};

export default ChatbotProvider;
