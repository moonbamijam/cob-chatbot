import { chatbot } from "../../../lib/bot-details";

const SampleBotChat = ({ style }) => {
  return (
    <div style={style} className="bot message">
      <div className="w-full relative flex items-center gap-2 mt-3 mb-2">
        <img
          src={chatbot.logo}
          alt="Chatbot Icon"
          width={35}
          height={35}
          className="rounded-full"
        />
        <div className="max-w-[80%] rounded-3xl bg-bot dark:bg-gray-600  px-4 py-3 break-words">
          <p id="message" className="dark:text-white">
            Lorem ipsum dolor sit.
          </p>
          <div
            id="timeSent"
            className="w-full text-gray-500 dark:text-gray-300 text-xs text-right"
          >
            8:15 PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleBotChat;
