import { useState, useContext, useRef, SyntheticEvent, RefObject } from "react";

// context
import { ChatbotContext } from "@contexts/ChatbotContext";

// hooks
import useScrollIntoView from "@hooks/useScrollIntoView";

// utils
import { sleep } from "@utils/sleep";
import { scrollInto } from "@utils/scroll-into";
import { fullTimestamp, timestamp } from "@utils/timestamp";

// components
import ChatError from "@/src/features/chat/components/ChatError";
import Button from "@components/Button";
import Loading from "@components/Loading";
import Typing from "@features/chat/components/Typing";
import ChatSkeleton from "@features/chat/components/ChatSkeleton";

// layouts
import ItemsRenderer from "@layouts/ItemsRenderer";
import BotMiniProfile from "@layouts/BotMiniProfile";
import Chat from "@features/chat/layouts/Chat";

// types
import { ConversationType } from "@shared/ts/type";

// icons
import { FaArrowDown } from "react-icons/fa6";

// styles
import "@styles/utils.css";

const chatPerPage = 15;
const step = 10;

type chatSectionProps = {
  latestChat: RefObject<HTMLDivElement>;
  isLargeScreen: boolean;
};

const ChatSection = ({ latestChat, isLargeScreen }: chatSectionProps) => {
  const chatbot = useContext(ChatbotContext);
  const { conversation } = chatbot.conversation;
  const { error } = chatbot.error;
  const { isOnline } = chatbot.isOnline;
  const { isBotTyping } = chatbot.isTyping;
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
            return (
              <Chat
                key={convo.chatId}
                role={convo.role}
                chat={convo.chat}
                image={convo.image}
                video={convo.video}
                file={convo.file}
                fileLink={convo.fileLink}
                fileType={convo.fileType}
                link={convo.link}
                depts={convo.depts}
                timestamp={timestamp.format(
                  new Date(convo.timestamp.seconds * 1000),
                )}
                fullTimestamp={fullTimestamp.format(
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
        className={`${backToView} absolute bottom-[25%] animate-bounce bg-surface hover:bg-primary [&>svg>path]:hover:text-white dark:bg-dm-surface dark:border-transparent dark:hover:bg-dm-surface-dark [&>svg>path]:dark:hover:text-primary z-50`}
        onClick={() => handleScrollIntoView(latestChat)}
      >
        <FaArrowDown />
      </Button>
      <section
        className={`relative w-full h-full px-4 py-6 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface`}
        onScroll={handleScroll}
      >
        <BotMiniProfile
          className="mb-8 w-full"
          miniProfileRef={miniProfileRef}
        />
        {loadingMoreChats && <Loading />}
        {conversation.length ? (
          <div
            id="chats"
            className={`${isLargeScreen ? "xl:max-w-[70%] xl:mx-auto" : ""} `}
            ref={chatAreaRef}
          >
            {renderChatsContent()}
            {isBotTyping && <Typing />}
          </div>
        ) : (
          <ChatSkeleton />
        )}
        {error && <ChatError message={"something went wrong!"} />}
        {!isOnline && <ChatError message={"no internet connection."} />}
        <div ref={latestChat}></div>
      </section>
    </>
  );
};

export default ChatSection;
