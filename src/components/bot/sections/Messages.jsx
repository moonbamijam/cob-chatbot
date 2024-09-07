// Contexts & Providers
import InternetProvider from "../../../contexts/InternetProvider";

// Utilities
import {
  containsPlaceholder,
  splitLinkToResponse,
} from "../../../utils/splitLink";

// Components
import Error from "../ui/Error";
import MiniProfile from "./MiniProfile";
import Chat from "../ui/Chat";
import Typing from "../ui/Typing";
import ChatSkeleton from "../skeletons/ChatSkeleton";

const Messages = ({ loading, messages, botIsTyping, error, latestMessage }) => {
  const renderMessagesContent = () => {
    if (messages)
      return messages.map((message, id) => {
        if (containsPlaceholder(message.message)) {
          const interpolatedLink = splitLinkToResponse(
            message.message,
            message.intent,
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
      });
  };

  return (
    <section
      className={`w-full xl:max-h-[612px] h-full px-4 py-6 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface`}
    >
      <MiniProfile />
      <InternetProvider>
        {loading ? (
          <ChatSkeleton />
        ) : (
          <div id="messages" className="">
            {renderMessagesContent()}
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
