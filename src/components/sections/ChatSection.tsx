import { useState, useContext, useRef, SyntheticEvent, RefObject } from "react";

// context
import { ChatbotContext } from "@contexts/ChatbotContext";

// hooks
import useScrollIntoView from "@hooks/useScrollIntoView";

// utils
import {
  containsPlaceholder,
  splitLinkToResponse,
} from "@src/utils/split-link";
import { sleep } from "@utils/sleep";
import { scrollInto } from "@src/utils/scroll-into";
import { timestamp } from "@utils/timestamp";

// components
import Error from "@src/components/layouts/Error";
import MiniProfile from "./MiniProfile";
import Chat from "@components/layouts/chat/Chat";
import Typing from "@src/components/layouts/Typing";
import ChatSkeleton from "@src/components/layouts/skeletons/ChatSkeleton";
import Loading from "@src/components/layouts/Loading";
import Button from "@src/components/layouts/Button";
import ItemsRenderer from "@components/common/ItemsRenderer";

// types
import { ConversationType } from "@src/shared/ts/type";

// icons
import { FaArrowDown } from "react-icons/fa6";

// styles
import "@styles/utils.css";

const chatPerPage = 15;
const step = 10;

type ChatSectionProps = {
  botIsTyping: boolean;
  latestChat: RefObject<HTMLDivElement>;
};

const ChatSection = ({ botIsTyping, latestChat }: ChatSectionProps) => {
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
            if (containsPlaceholder(convo.chat)) {
              const interpolatedLink = splitLinkToResponse(convo.chat);
              return (
                <Chat
                  key={convo.chatId}
                  role={convo.role}
                  depts={convo.depts}
                  link={interpolatedLink}
                  timestamp={timestamp.format(
                    new Date(convo.timestamp.seconds * 1000),
                  )}
                />
              );
            } else
              return (
                <Chat
                  key={convo.chatId}
                  role={convo.role}
                  chat={convo.chat}
                  image={convo.image}
                  video={convo.video}
                  docs={convo.docs}
                  docsLink={convo.docsLink}
                  depts={convo.depts}
                  timestamp={timestamp.format(
                    new Date(convo.timestamp.seconds * 1000),
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
          <div id="chats" ref={chatAreaRef}>
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
