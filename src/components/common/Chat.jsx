import { chatbot } from "../../libs/bot-details";

const Chat = ({ role, message, timeSent }) => {
  return (
    <div className={`${role == "bot" ? "bot message" : "user message"} `}>
      <div
        className={`${
          role == "bot"
            ? "w-full relative flex items-center gap-2"
            : "w-full flex justify-end"
        }  mt-3 mb-2`}
      >
        {role == "bot" ? (
          <img
            src={chatbot.logo}
            alt="Chatbot Icon"
            width={35}
            height={35}
            className="rounded-full"
          />
        ) : (
          ""
        )}
        <div
          className={`max-w-[80%] rounded-3xl ${
            role == "bot" ? "bg-[#F4F0F2] dark:bg-gray-600 dark:text-white" : "bg-highlight text-white"
          } px-4 py-3 break-words`}
        >
          <p id="message">{message}</p>
          <div
            id="timeSent"
            className={`w-full ${
              role == "bot" ? "text-gray-500 dark:text-gray-300" : "text-gray-300"
            } text-xs text-right`}
          >
            {timeSent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
