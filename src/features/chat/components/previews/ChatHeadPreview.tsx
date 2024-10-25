import { useContext } from "react";
import { ChatbotContext } from "@/contexts/ChatbotContext";
import { ChatContext } from "@/contexts/ChatContext";

const ChatHeadPreview = () => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;
  const chat = useContext(ChatContext);
  const { chatHeadSize } = chat.chatHeadSize;

  return (
    <div className="hidden xs:block w-max h-max rounded-full overflow-hidden ">
      <img
        src={configuration.widgetIcon}
        alt="chat head logo"
        width={chatHeadSize}
        height={chatHeadSize}
        className="aspect-square object-cover"
      />
    </div>
  );
};

export default ChatHeadPreview;
