import { CSSProperties, useContext } from "react";

// context
import { ChatbotContext } from "@contexts/ChatbotContext";

type SampleBotChatProps = Partial<
  Readonly<{
    style: CSSProperties;
    chat: string;
    linkedChat: string;
  }>
>;

const SampleBotChat = ({ style, chat, linkedChat }: SampleBotChatProps) => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;

  return (
    <div style={style} className="bot chat">
      <div className="w-full relative flex items-center gap-2 mt-3 mb-2">
        <img
          src={configuration.icon}
          alt="Chatbot Icon"
          width={35}
          height={35}
          className="rounded-full aspect-square object-cover select-none"
        />
        {chat && (
          <div className="max-w-[80%] rounded-3xl shadow bg-surface dark:bg-dm-surface px-4 py-3 space-y-2 break-words">
            <div id="chat" className="dark:text-white">
              {chat}
              {linkedChat && (
                <div className="text-primary dark:text-secondary font-semibold hover:underline">
                  {linkedChat}
                </div>
              )}
            </div>
            <div
              id="timeSent"
              className="w-full text-gray-500 dark:text-gray-300 text-xs text-right opacity-80"
            >
              {new Date().toLocaleTimeString().replace(/(.*)\D\d+/, "$1")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleBotChat;
