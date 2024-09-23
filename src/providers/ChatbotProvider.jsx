import { useState, useEffect, useMemo } from "react";
import { ChatbotContext } from "../contexts/ChatbotContext";

// db
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const botProfileCollectionRef = collection(db, "profile");

const ChatbotProvider = ({ children }) => {
  const [configuration, setConfiguration] = useState({});
  const [conversation, setConversation] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [isOnline, setOnline] = useState(true);
  const [error, setError] = useState(false);

  const getBotProfile = async () => {
    try {
      console.log("Getting bot information...");
      onSnapshot(doc(botProfileCollectionRef, "botProfile"), (doc) => {
        setConfiguration({
          url: import.meta.env.VITE_CHATBOT_API_URL,
          icon: doc.data().interactionIconURL,
          widgetIcon: doc.data().widgetIconUrl,
          name: doc.data().botName,
          slogan: doc.data().metadata.slogan,
          initialGreet: `👋 Hello there! My name is ${doc.data().botName}, your friendly chatbot assistant. Welcome to our conversation! Whether you're here for assistance or information I'm here to help. Feel free to ask me anything or simply say hi.`,
          errorMessage:
            "Sorry, I can't seem to understand what your saying. Could you please try it again?",
        });
      });
      console.log("Bot information received.");
    } catch (error) {
      console.log(error);
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
      chatbot: {
        configuration: [configuration, setConfiguration],
        conversation: [conversation, setConversation],
        faqs: [faqs, setFaqs],
        error: [error, setError],
        online: [isOnline, setOnline],
      },
    };
  }, [
    configuration,
    setConfiguration,
    conversation,
    setConversation,
    faqs,
    setFaqs,
    error,
    setError,
    isOnline,
    setOnline,
  ]);

  return (
    <ChatbotContext.Provider value={chatbot}>
      {children}
    </ChatbotContext.Provider>
  );
};

export default ChatbotProvider;
