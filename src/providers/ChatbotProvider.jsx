import { useState, useEffect, useMemo } from "react";
import { ChatbotContext } from "../contexts/ChatbotContext";

const ChatbotProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
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
        conversation: [conversation, setConversation],
        faqs: [faqs, setFaqs],
        error: [error, setError],
        online: [isOnline, setOnline],
      },
    };
  }, [
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
