// Contexts & Providers
import InternetProvider from "../../../providers/InternetProvider";

// Utilities
import {
  containsPlaceholder,
  splitLinkToResponse,
} from "../../../utils/split-link";

// Components
import Error from "../ui/Error";
import Loading from "../ui/Loading";
import MiniProfile from "./MiniProfile";
import Chat from "../ui/Chat";
import Typing from "../ui/Typing";

const Messages = ({
  settings,
  loading,
  messages,
  botIsTyping,
  error,
  latestMessage,
}) => {
  return (
    <section
      className={`${
        settings ? "-translate-x-full hidden" : ""
      } w-full h-full px-4 py-6 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500`}
    >
      <MiniProfile state={settings} />
      <InternetProvider>
        {loading ? (
          <Loading />
        ) : (
          <div id="messages">
            {messages.map((message, id) => {
              if (containsPlaceholder(message.message)) {
                const interpolatedLink = splitLinkToResponse(
                  message.message,
                  message.intent
                );
                return (
                  <Chat
                    key={id}
                    role={message.role}
                    depts={message.depts}
                    link={interpolatedLink}
                    timeSent={new Date(message.timeSent.seconds * 1000)
                      .toLocaleTimeString()
                      .replace(/(.*)\D\d+/, "$1")}
                  />
                );
              } else
                return (
                  <Chat
                    key={id}
                    role={message.role}
                    message={message.message}
                    depts={message.depts}
                    timeSent={new Date(message.timeSent.seconds * 1000)
                      .toLocaleTimeString()
                      .replace(/(.*)\D\d+/, "$1")}
                  />
                );
            })}
            {botIsTyping && <Typing />}
          </div>
        )}
        {error && <Error message={"something went wrong!"} />}
      </InternetProvider>
      <div ref={latestMessage}></div>
    </section>
  );
};

export default Messages;
