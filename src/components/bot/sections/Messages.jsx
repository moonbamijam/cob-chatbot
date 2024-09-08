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
import Chat from "../Chat";
import Typing from "../ui/Typing";
import ChatSkeleton from "../skeletons/ChatSkeleton";
import { useContext } from "react";
import { ChatbotContext } from "../../../contexts/ChatbotContext";

const Messages = ({ loading, botIsTyping, latestMessage }) => {
  const { chatbot } = useContext(ChatbotContext);
  const [conversation] = chatbot.conversation;
  const [error] = chatbot.error;

  const renderMessagesContent = () => {
    if (conversation)
      return conversation.map((convo) => {
        if (containsPlaceholder(convo.message)) {
          const interpolatedLink = splitLinkToResponse(
            convo.message,
            convo.intent,
          );
          return (
            <Chat
              key={convo.messageId}
              role={convo.role}
              depts={convo.depts}
              link={interpolatedLink}
              timeSent={new Date(convo.timeSent.seconds * 1000)
                .toLocaleTimeString()
                .replace(/(.*)\D\d+/, "$1")}
            />
          );
        } else
          return (
            <Chat
              key={convo.messageId}
              role={convo.role}
              message={convo.message}
              depts={convo.depts}
              timeSent={new Date(convo.timeSent.seconds * 1000)
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
