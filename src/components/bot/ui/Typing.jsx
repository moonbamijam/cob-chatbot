import { useContext } from "react";
import { ChatbotContext } from "../../../contexts/ChatbotContext";

const Typing = () => {
  const { chatbot } = useContext(ChatbotContext);
  const [configuration] = chatbot.configuration;

  return (
    <div className="w-full mt-3 mb-2 rounded-3xl flex gap-2 items-center ">
      <img
        src={configuration.icon}
        alt="Chatbot Icon"
        width={35}
        height={35}
        className="rounded-full "
      />
      <div className="flex space-x-1 items-center rounded-3xl px-2 py-3 ">
        <div className="h-2 w-2 bg-surface-dark dark:bg-dm-surface-light rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-surface-dark dark:bg-dm-surface-light rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-surface-dark dark:bg-dm-surface-light rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Typing;
