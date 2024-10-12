import { useState, useContext, useRef, SyntheticEvent, RefObject } from "react";

// context
import { ChatbotContext } from "../../../contexts/ChatbotContext.tsx";

// hooks
import useScrollIntoView from "../../../hooks/useScrollIntoView.ts";

// utils
import {
  containsPlaceholder,
  splitLinkToResponse,
} from "../../../utils/splitLink.ts";
import { sleep } from "../../../utils/sleep.ts";
import { scrollInto } from "../../../utils/scrollInto.ts";
import { timestamp } from "../../../utils/timestamp.ts";

// components
import Error from "../ui/Error.tsx";
import MiniProfile from "./MiniProfile.tsx";
import Chat from "../Chat.tsx";
import Typing from "../ui/Typing.tsx";
import ChatSkeleton from "../skeletons/ChatSkeleton.tsx";
import Loading from "../ui/Loading.tsx";
import Button from "../ui/Button.tsx";
import ItemsRenderer from "../../common/ItemsRenderer.tsx";

// icons
import { FaArrowDown } from "react-icons/fa6";

// styles
import "../../../styles/utils.css";
import { ConversationType } from "../../../shared/type.ts";

const chatPerPage = 15;
const step = 10;

type ChatSectionType = {
  botIsTyping: boolean;
  latestChat: RefObject<HTMLDivElement>;
};

const ChatSection = ({ botIsTyping, latestChat }: ChatSectionType) => {
  const chatbot = useContext(ChatbotContext);
  const { conversation } = chatbot.conversation;
  const { error } = chatbot.error;
  const { isOnline } = chatbot.isOnline;
  const { backToView, setBackToView, handleScrollIntoView } =
    useScrollIntoView();
  const [displayedChats, setDisplayedChats] = useState(chatPerPage);
  const [loadingMoreChats, setLoadingMoreChats] = useState(false);

  // this holds the number of chats that only needed to display
  const conversationToDisplay = conversation.slice(
    Math.max(conversation.length - displayedChats, 0),
  );

  // for referencing html tags
  const chatAreaRef = useRef<HTMLDivElement | null>(null);
  const miniProfileRef = useRef<HTMLElement | null>(null);

  // handles infinite scrolling
  const handleScroll = async (event: SyntheticEvent) => {
    const chatBoxScrollTop = event.currentTarget.scrollTop;
    const componentFullHeight = event.currentTarget.scrollHeight;
    const componentHalfHeight = (componentFullHeight - 457) / 2;
    const totalChatsDisplayed = chatAreaRef.current?.children.length;
    try {
      if (typeof latestChat.current == "object" && totalChatsDisplayed) {
        if (
          chatBoxScrollTop <= componentHalfHeight &&
          totalChatsDisplayed > 10
        ) {
          // handles the scroll to latest arrow button
          setBackToView("show");
        } else setBackToView("hide");

        // checks wether is there more chats to load or no
        if (
          conversationToDisplay.length != conversation.length &&
          chatBoxScrollTop == 0 // absolute zero to avoid loading of previous chats on refresh
        ) {
          console.log("Loading more chats");
          setLoadingMoreChats(true);
          await sleep(1); // mock loading
          setLoadingMoreChats(false);
          setDisplayedChats(displayedChats + step);
          scrollInto(miniProfileRef);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderChatsContent = () => {
    if (conversation) {
      return (
        <ItemsRenderer
          items={conversationToDisplay}
          renderItems={(convo: ConversationType) => {
            if (containsPlaceholder(convo.message)) {
              const interpolatedLink = splitLinkToResponse(convo.message);
              return (
                <Chat
                  key={convo.messageId}
                  role={convo.role}
                  depts={convo.depts}
                  link={interpolatedLink}
                  timeSent={timestamp.format(
                    new Date(convo.timeSent.seconds * 1000),
                  )}
                />
              );
            } else
              return (
                <Chat
                  key={convo.messageId}
                  role={convo.role}
                  message={convo.message}
                  depts={convo.depts}
                  timeSent={timestamp.format(
                    new Date(convo.timeSent.seconds * 1000),
                  )}
                />
              );
          }}
        />
      );
    }
  };

  return (
    <>
      <Button
        className={`${backToView} absolute bottom-[150px] animate-bounce bg-surface hover:bg-primary [&>svg>path]:hover:text-white dark:bg-dm-surface dark:border-transparent dark:hover:bg-dm-surface-dark [&>svg>path]:dark:hover:text-primary z-50`}
        onClick={() => handleScrollIntoView(latestChat)}
      >
        <FaArrowDown />
      </Button>
      <section
        className={`relative w-full h-full px-4 py-6 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface`}
        onScroll={handleScroll}
      >
        <MiniProfile className="mb-8" miniProfileRef={miniProfileRef} />
        {loadingMoreChats && <Loading />}
        {conversation ? (
          <div id="messages" ref={chatAreaRef}>
            {renderChatsContent()}
            {botIsTyping && <Typing />}
          </div>
        ) : (
          <ChatSkeleton />
        )}
        {error && <Error message={"something went wrong!"} />}
        {!isOnline && <Error message={"no internet connection."} />}
        <div ref={latestChat}></div>
      </section>
    </>
  );
};

export default ChatSection;
