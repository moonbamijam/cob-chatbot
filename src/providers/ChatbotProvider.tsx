import { useState, useEffect, useMemo } from "react";
import { ChatbotContext } from "@contexts/ChatbotContext";

// db
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

// types
import {
  ConfigurationType,
  ConversationType,
  FaqType,
} from "@src/shared/ts/type";

// lib
import { chatbotConfig } from "@src/lib/bot/chatbot-config";

const botProfileCollectionRef = collection(db, "profile");

const ChatbotProvider = ({ children }: { children: React.ReactNode }) => {
  const [configuration, setConfiguration] = useState<ConfigurationType>({
    icon: "",
    widgetIcon: "",
    name: chatbotConfig.name,
    slogan: chatbotConfig.slogan,
  });
  const [conversation, setConversation] = useState<ConversationType[]>([]);
  const [faqs, setFaqs] = useState<FaqType[]>([]);
  const [isOnline, setOnline] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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
      faqs: { faqs, setFaqs },
      error: { error, setError },
      isOnline: { isOnline, setOnline },
    };
  }, [configuration, conversation, faqs, error, isOnline]);

  return (
    <ChatbotContext.Provider value={chatbot}>
      {children}
    </ChatbotContext.Provider>
  );
};

export default ChatbotProvider;
