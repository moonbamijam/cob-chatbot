import { useContext } from "react";

// context
import { ChatbotContext } from "../../../contexts/ChatbotContext";

const SampleBotChat = ({ style, message, linkedMessage }) => {
  const { chatbot } = useContext(ChatbotContext);
  const [configuration] = chatbot.configuration;

  return (
    <div style={style} className="bot message">
      <div className="w-full relative flex items-center gap-2 mt-3 mb-2">
        <img
          src={configuration.icon}
          alt="Chatbot Icon"
          width={35}
          height={35}
          className="rounded-full"
        />
        <div className="max-w-[80%] rounded-3xl shadow bg-surface dark:bg-dm-surface px-4 py-3 break-words">
          <p id="message" className="dark:text-white">
            {message}
            {linkedMessage && (
              <button className="text-left text-primary dark:text-secondary font-semibold uppercase hover:underline">
                {linkedMessage}
              </button>
            )}
          </p>
          <div
            id="timeSent"
            className="w-full text-gray-500 dark:text-gray-300 text-xs text-right opacity-80"
          >
            {new Date().toLocaleTimeString().replace(/(.*)\D\d+/, "$1")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleBotChat;
