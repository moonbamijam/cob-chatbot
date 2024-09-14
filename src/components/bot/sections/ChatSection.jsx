import { useState, useContext, useRef } from "react";

// Contexts & Providers
import InternetProvider from "../../../contexts/InternetProvider";
import { ChatbotContext } from "../../../contexts/ChatbotContext";

// utils
import {
  containsPlaceholder,
  splitLinkToResponse,
} from "../../../utils/splitLink";
import { sleep } from "../../../utils/sleep";
import { scrollInto } from "../../../utils/scrollInto";

// components
import Error from "../ui/Error";
import MiniProfile from "./MiniProfile";
import Chat from "../Chat";
import Typing from "../ui/Typing";
import ChatSkeleton from "../skeletons/ChatSkeleton";
import Loading from "../ui/Loading";
import Button from "../ui/Button";
import useScrollIntoView from "../../../hooks/useScrollIntoView";

// icons
import { FaArrowDown } from "react-icons/fa6";

import "../../../styles/utils.css";

const chatPerPage = 15;
const step = 10;

const ChatSection = ({ botIsTyping, latestChat }) => {
  const { chatbot } = useContext(ChatbotContext);
  const [conversation] = chatbot.conversation;
  const [error] = chatbot.error;
  const { backToView, setBackToView, handleScrollIntoView } =
    useScrollIntoView();
  const [displayedChats, setDisplayedChats] = useState(chatPerPage);
  const [loadingMoreChats, setLoadingMoreChats] = useState(false);

  // this holds the number of chats that only needed to display
  const conversationToDisplay = conversation.slice(
    Math.max(conversation.length - displayedChats, 0),
  );

  // for referencing html tags
  const chatAreaRef = useRef(null);
  const scrollRef = useRef(null);
  const miniProfileRef = useRef(null);

  // handles infinite scrolling
  const handleScroll = async (e) => {
    const chatBoxScrollTop = e.target.scrollTop;
    const componentFullHeight = e.target.scrollHeight;
    const componentHalfHeight = (componentFullHeight - 457) / 2;
    const totalChatsDisplayed = chatAreaRef.current.children.length;

    try {
      if (typeof latestChat.current == "object") {
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
          chatBoxScrollTop <= 10
        ) {
          console.log(`Getting ${step} chats`);
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
      return conversationToDisplay.map((convo) => {
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
        className={`relative w-full xl:max-h-[600px] h-full px-4 py-6 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface`}
        onScroll={handleScroll}
      >
        <div
          className="scrollhere absolute top-[-50px] h-[50px]"
          ref={scrollRef}
        ></div>
        <MiniProfile className="mt-10 mb-8" miniProfileRef={miniProfileRef} />
        {loadingMoreChats && <Loading />}
        <InternetProvider>
          {conversation ? (
            <div id="messages" ref={chatAreaRef}>
              {renderChatsContent()}
              {botIsTyping && <Typing />}
            </div>
          ) : (
            <ChatSkeleton />
          )}
          {error && <Error message={"something went wrong!"} />}
        </InternetProvider>
        <div ref={latestChat}></div>
      </section>
    </>
  );
};

export default ChatSection;
