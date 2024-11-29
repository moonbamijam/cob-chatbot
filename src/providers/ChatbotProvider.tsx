import { useState, useEffect, useMemo } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";

// contexts
import { ChatbotContext } from "@contexts/ChatbotContext";

// types
import { ConfigurationType, ConversationType } from "@shared/ts/type";

// constants
import { db } from "@constants/firebase/config";
import { chatbotConfig } from "@constants/bot/chatbot-config";

// assets
import ChatbotLogo from "@static/assets/images/logo.png";

const botProfileCollectionRef = collection(db, "profile");

const ChatbotProvider = ({ children }: { children: React.ReactNode }) => {
  const [configuration, setConfiguration] = useState<ConfigurationType>({
    icon: ChatbotLogo,
    widgetIcon: ChatbotLogo,
    name: chatbotConfig.name,
    slogan: chatbotConfig.slogan,
  });
  const [conversation, setConversation] = useState<ConversationType[]>([]);
  const [isOnline, setOnline] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [isChatPaused, setIsChatPaused] = useState<boolean>(false);

  const getBotProfile = async () => {
    try {
      console.time("Received bot info in");
      onSnapshot(doc(botProfileCollectionRef, "botProfile"), (doc) => {
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

  useEffect(() => {
    setOnline(navigator.onLine);
    getBotProfile();
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
      error: { error, setError },
      isOnline: { isOnline, setOnline },
      isTyping: { isBotTyping, setIsBotTyping },
      isChatPaused: { isChatPaused, setIsChatPaused },
    };
  }, [configuration, conversation, error, isOnline, isBotTyping, isChatPaused]);

  return (
    <ChatbotContext.Provider value={chatbot}>
      {children}
    </ChatbotContext.Provider>
  );
};

export default ChatbotProvider;
