import { useContext, useState } from "react";

// Context & Providers
import { FontSizeContext } from "../../../providers/FontSizeProvider";

import { chatbot } from "../../../lib/bot-details";

import DepartmentBtn from "../buttons/DepartmentBtn";

const step = 4;

const Chat = ({ role, message, depts, timeSent, link }) => {
  const [fontSize, setFontSize] = useContext(FontSizeContext);
  const [numberOfDeptsToShow, setNumberOfDeptsToShow] = useState(step);

  const loadMore = () => {
    setNumberOfDeptsToShow(numberOfDeptsToShow + step);
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
            className="rounded-full select-none"
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
            className="relative dark:text-white whitespace-pre-line"
          >
            {message}
            {depts
              ? depts
                  .slice(0, numberOfDeptsToShow)
                  .map((dept, id) => (
                    <DepartmentBtn
                      key={id}
                      deptName={dept.deptName}
                      service={dept.service}
                      steps={dept.steps}
                      requirements={dept.requirements}
                    />
                  ))
              : null}
            {depts && (
              <button
                onClick={() => loadMore()}
                className={`w-full absolute -bottom-3 bg-gradient-to-t from-bot dark:from-gray-600 from-15% h-[100px] z-[5] backdrop-blur-xs  ${
                  depts?.length <= numberOfDeptsToShow ? "hidden" : "block"
                } hover:backdrop-blur-0 [&>p]:hover:opacity-15`}
              >
                <p className="font-semibold text-white drop-shadow-lg animate-bounce text-base">Click here to show more</p>
              </button>
            )}
            {link ? (
              <div className="" dangerouslySetInnerHTML={{ __html: link }} />
            ) : null}
          </div>
          <div
            id="timeSent"
            className={`w-full ${
              role == "bot"
                ? "text-gray-500 dark:text-gray-300"
                : "text-gray-300"
            } text-xs text-right z-[9]`}
          >
            {timeSent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
