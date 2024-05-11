import { useContext, useState } from "react";

// Context & Providers
import { FontSizeContext } from "../../../providers/FontSizeProvider";

import { chatbot } from "../../../lib/botDetails";
import DepartmentBtn from "../buttons/DepartmentBtn";
import { BsArrowDownCircleFill } from "react-icons/bs";

const step = 4;

const Chat = ({ role, message, depts, timeSent, link }) => {
  const [fontSize] = useContext(FontSizeContext);
  const [numberOfDeptsToShow, setNumberOfDeptsToShow] = useState(step);

  const loadMore = () => {
    setNumberOfDeptsToShow(numberOfDeptsToShow + step);
  };

  const renderDeptsContent = () => {
    if (depts)
      return depts
        .slice(0, numberOfDeptsToShow)
        .map((dept, id) => (
          <DepartmentBtn
            key={id}
            deptName={dept.deptName}
            service={dept.service}
            steps={dept.steps}
            requirements={dept.requirements}
          />
        ));
  };

  const renderChat = () => {
    if (role === "bot") {
      return (
        <div className="bot message">
          <div className="w-full relative flex items-center gap-2 mt-3 mb-2">
            <img
              src={chatbot.logo}
              alt="Chatbot Icon"
              width={35}
              height={35}
              className="rounded-full select-none"
            />
            <div className="max-w-[80%] rounded-3xl shadow bg-surface dark:bg-dm-surface px-4 py-3 break-words">
              <div
                id="message"
                style={{ fontSize: fontSize }}
                className="relative dark:text-white whitespace-pre-line"
              >
                {message}
                {renderDeptsContent()}
                {depts && (
                  <button
                    onClick={() => loadMore()}
                    className={`w-full absolute -bottom-1 bg-gradient-to-t from-surface dark:from-dm-surface from-15% h-[100px] z-[5] backdrop-blur-xs  ${
                      depts?.length <= numberOfDeptsToShow ? "hidden" : "block"
                    } hover:backdrop-blur-0 [&>p]:hover:opacity-15`}
                  >
                    <p className="flex flex-col items-center justify-center gap-1 font-semibold text-primary dark:text-secondary drop-shadow-lg animate-bounce text-base">
                      Click here to show more
                      <BsArrowDownCircleFill />
                    </p>
                  </button>
                )}
                {link ? (
                  <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: link }}
                  />
                ) : null}
              </div>
              <div
                id="timeSent"
                className="text-gray-500 dark:text-gray-300 text-xs text-right opacity-80 z-[9]"
              >
                {timeSent}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (role === "user") {
      return (
        <div className="user message">
          <div
            className="w-full flex justify-end
            mt-3 mb-2"
          >
            <div className="max-w-[80%] rounded-3xl shadow bg-primary text-white px-4 py-3 break-words">
              <div
                id="message"
                style={{ fontSize: fontSize }}
                className="relative dark:text-white whitespace-pre-line"
              >
                {message}
              </div>
              <div
                id="timeSent"
                className="w-full text-gray-300 text-xs text-right opacity-80 z-[9]"
              >
                {timeSent}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <>{renderChat()}</>;
};

export default Chat;
