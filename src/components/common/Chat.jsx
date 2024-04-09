import { useContext } from "react";

// Context & Providers
import { FontSizeContext } from "../../providers/FontSizeProvider";

import { chatbot } from "../../libs/bot-details";

const Chat = ({ role, message, timeSent }) => {
  const [fontSize, setFontSize] = useContext(FontSizeContext);

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
            role == "bot"
              ? "bg-bot dark:bg-gray-600"
              : "bg-highlight text-white"
          } px-4 py-3 break-words`}
        >
          <p
            id="message"
            style={{ fontSize: fontSize }}
            className="dark:text-white"
          >
            {message}
          </p>
          <div
            id="timeSent"
            className={`w-full ${
              role == "bot"
                ? "text-gray-500 dark:text-gray-300"
                : "text-gray-300"
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
