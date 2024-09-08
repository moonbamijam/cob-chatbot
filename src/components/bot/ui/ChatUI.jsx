const ChatUI = ({ messageBy, img, children, timeSent, fontSize }) => {
  const renderChatUI = () => {
    switch (messageBy) {
      case "bot":
        return (
          <div className={`${messageBy} message`}>
            <div className="w-full relative flex items-center gap-2 mt-3 mb-2">
              <img
                src={img}
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
                  {children}
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
      case "user":
        return (
          <div className={`${messageBy} message`}>
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
                  {children}
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

  return <>{renderChatUI()}</>;
};

export default ChatUI;
