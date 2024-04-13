import { useContext, useState } from "react";

// Context & Providers
import { FontSizeContext } from "../../../providers/FontSizeProvider";

import { chatbot } from "../../../libs/bot-details";

const Chat = ({ role, message, askingForDepts, depts, timeSent }) => {
  const [fontSize, setFontSize] = useContext(FontSizeContext);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);

  const toggleOne = () => {
    setOne(!one);
    setTwo(false);
    setThree(false);
  };
  const toggleTwo = () => {
    setOne(false);
    setTwo(!two);
    setThree(false);
  };
  const toggleThree = () => {
    setOne(false);
    setTwo(false);
    setThree(!three);
  };

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
          <div
            id="message"
            style={{ fontSize: fontSize }}
            className="dark:text-white whitespace-pre-line"
          >
            {message}
            {askingForDepts
              ? depts && (
                  <div className="flex flex-col mt-2 gap-y-2">
                    <div
                      onClick={() => toggleOne()}
                      className="rounded-3xl px-4 py-3 text-left text-white bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <p className="">OFFICE OF THE CITY MAYOR (MO)</p>
                      <div
                        className={`${
                          one ? "block" : "hidden"
                        } px-4 py-3 rounded-3xl mt-2`}
                      >
                        Service: Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                      </div>
                    </div>
                    <div
                      onClick={() => toggleTwo()}
                      className="rounded-3xl px-4 py-3 text-left text-white bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <p className="">OFFICE OF THE CITY VICE MAYOR (OVM)</p>
                      <div
                        className={`${
                          two ? "block" : "hidden"
                        } px-4 py-3 rounded-3xl mt-2`}
                      >
                        Steps: Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Blandit massa enim nec
                        dui nunc mattis enim.
                      </div>
                    </div>
                    <div
                      onClick={() => toggleThree()}
                      className="rounded-3xl px-4 py-3 text-left text-white bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <p className="">
                        OFFICE OF THE CITY ADMINISTRATOR (ADMIN)
                      </p>
                      <div
                        className={`${
                          three ? "block" : "hidden"
                        } px-4 py-3 rounded-3xl mt-2`}
                      >
                        Requirements: Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </div>
                    </div>
                  </div>
                )
              : ""}
          </div>
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
