import { useState } from "react";
import { ChatbotContext } from "../contexts/ChatbotContext";
import { useMemo } from "react";

const ChatbotProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const chatbotData = useMemo(() => {
    return {
      chatbot: {
        conversation: [conversation, setConversation],
        faqs: [faqs, setFaqs],
        error: [error, setError],
      },
    };
  }, [conversation, setConversation, faqs, setFaqs, error, setError]);

  return (
    <ChatbotContext.Provider value={chatbotData}>
      {children}
    </ChatbotContext.Provider>
  );
};

export default ChatbotProvider;
