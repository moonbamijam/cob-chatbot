import React, { FormEvent, LegacyRef, useContext } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

// contexts
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import Button from "@components/ui/Button";
import SkeletonScreen from "@components/ui/SkeletonScreen";

// layouts
import ItemsRenderer from "@layouts/ItemsRenderer";

// icons
import { IoSend } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

// type
import { suggestedQueriesType } from "@shared/ts/type";

type ChatInputSectionProps = Readonly<{
  questionsListRef: LegacyRef<HTMLDivElement> | null;
  sendMessageToBot: (
    event:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | FormEvent<HTMLInputElement | HTMLFormElement>,
    message: string,
  ) => void;
  sendSuggestedQueryToBot: (message: string) => void;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  isFaqsMenuActive: boolean;
  setIsFaqsMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
  isLargeScreen: boolean;
}>;

const ChatInputSection = ({
  questionsListRef,
  sendMessageToBot,
  sendSuggestedQueryToBot,
  userMessage,
  setUserMessage,
  isFaqsMenuActive,
  setIsFaqsMenuActive,
  isLargeScreen,
}: ChatInputSectionProps) => {
  const chatbot = useContext(ChatbotContext);
  const { menuAccessQueries } = chatbot.menuAccessQuery;
  const { isChatPaused } = chatbot.isChatPaused;

  const toggleFaqsMenu = () => {
    setIsFaqsMenuActive(!isFaqsMenuActive);
  };

  const handleSendChat = (
    event:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | FormEvent<HTMLInputElement | HTMLFormElement>,
  ) => {
    const trimmedMessage = userMessage.trim();
    // message should be sent if its enter key without shift and not empty
    if (
      (event as React.KeyboardEvent<HTMLTextAreaElement>).key == "Enter" &&
      !(event as React.KeyboardEvent<HTMLTextAreaElement>).shiftKey &&
      trimmedMessage != "" &&
      !isChatPaused
    ) {
      sendMessageToBot(
        event as React.KeyboardEvent<HTMLTextAreaElement>,
        trimmedMessage,
      );
      setUserMessage("");
    } else if (
      (event as React.KeyboardEvent<HTMLTextAreaElement>).key == "Enter" &&
      !(event as React.KeyboardEvent<HTMLTextAreaElement>).shiftKey
    ) {
      // this will just clear the spaces if you try to send empty messages using shift + enter
      event.preventDefault();
      if (!isChatPaused) setUserMessage("");
    }
  };

  const renderSuggestedQueries = () => {
    return (
      <section
        id="questions-list"
        className={`w-full ${isLargeScreen ? "xl:max-w-[70%] max-w-[95%]" : "max-w-[95%]"} max-h-[500px] md:max-h-[400px] xl:max-h-[300px] absolute bottom-[7%] sm:bottom-[6%] lg:bottom-[5%] px-4 py-5 mb-[160px] rounded-3xl bg-white dark:bg-dm-surface border border-surface dark:border-dm-surface-dark overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark z-50 ${isFaqsMenuActive ? "block opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div className="mb-4 font-semibold">
          <h1 className="capitalize text-black/80 dark:text-white/80">
            hello there!
          </h1>
          <p className="text-black/50 dark:text-white/50">
            You can ask me about,
          </p>
        </div>

        <div
          className={`inline-grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 ${isLargeScreen ? "xl:grid-cols-3 2xl:grid-cols-4" : ""} gap-2`}
        >
          {menuAccessQueries.length ? (
            <ItemsRenderer
              items={menuAccessQueries}
              renderItems={({ id, label, text }: suggestedQueriesType) => (
                <Button
                  key={id}
                  variant="outline"
                  className={`rounded-3xl w-full h-full normal-case border border-primary text-xs xs:text-sm text-primary dark:text-white hover:bg-primary hover:text-white ${isChatPaused ? "cursor-wait" : "active:translate-y-1"}`}
                  onClick={() => sendSuggestedQueryToBot(text)}
                  disabled={isChatPaused}
                >
                  {label}
                </Button>
              )}
            />
          ) : (
            <>
              <SkeletonScreen className="bg-surface dark:bg-dm-surface-light max-h-[80px] min-w-[200px]" />
              <SkeletonScreen className="bg-surface dark:bg-dm-surface-light max-h-[80px] min-w-[200px]" />
              <SkeletonScreen className="bg-surface dark:bg-dm-surface-light max-h-[80px] min-w-[200px]" />
              <SkeletonScreen className="bg-surface dark:bg-dm-surface-light max-h-[80px] min-w-[200px]" />
              <SkeletonScreen className="bg-surface dark:bg-dm-surface-light max-h-[80px] min-w-[200px]" />
            </>
          )}
        </div>
      </section>
    );
  };

  return (
    <div
      ref={questionsListRef}
      className={`w-full flex justify-center items-center ${isLargeScreen ? "xl:max-w-[50%]" : ""}`}
    >
      {renderSuggestedQueries()}
      <form
        onSubmit={(
          event:
            | React.KeyboardEvent<HTMLTextAreaElement>
            | FormEvent<HTMLInputElement | HTMLFormElement>,
        ) => sendMessageToBot(event, userMessage)}
        className="w-full flex justify-between items-center gap-1 px-2 pt-2"
      >
        <Button
          variant="icon"
          size="icon"
          className={`text-primary hover:bg-surface dark:hover:bg-dm-surface ${isFaqsMenuActive && "bg-primary [&>svg]:text-white hover:bg-primary dark:hover:bg-primary"}`}
          type="button"
          onClick={toggleFaqsMenu}
        >
          <LuMenu />
        </Button>
        <label
          htmlFor="chat-input"
          className="w-full px-2 rounded-3xl flex items-center border border-surface-dark outline-primary focus-within:border-primary dark:border-transparent dark:bg-dm-surface dark:focus-within:bg-dm-surface-light cursor-text"
        >
          <ReactTextareaAutosize
            id="chat-input"
            name="chat-input"
            autoFocus
            spellCheck={false}
            value={userMessage}
            onChange={(e) => {
              setUserMessage(e.target.value);
              setIsFaqsMenuActive(false);
            }}
            onKeyDown={handleSendChat}
            className={`${isLargeScreen ? "xl:max-h-[200px] " : "max-h-[100px] "} whitespace-pre-line w-full dark:text-white outline-none bg-transparent placeholder:text-sm sm:placeholder:text-base px-2 my-3 dark:bg-dm-surface dark:focus:bg-dm-surface-light placeholder:opacity-80 caret-primary dark:caret-secondary scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark`}
            placeholder="Type here..."
          />
        </label>
        <Button
          variant="icon"
          size="icon"
          className="text-primary active:translate-x-1 hover:bg-surface dark:hover:bg-dm-surface cursor-pointer"
          type="submit"
          onClick={() => setIsFaqsMenuActive(false)}
          disabled={!userMessage || isChatPaused}
        >
          <IoSend />
        </Button>
      </form>
    </div>
  );
};

export default ChatInputSection;
