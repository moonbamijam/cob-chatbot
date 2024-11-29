import { MouseEventHandler, useContext } from "react";

// contexts
import { FontContext } from "@contexts/FontContext";
import { ChatContext } from "@contexts/ChatContext";

// hooks
import useChatbot from "@hooks/useChatbot";

// components
import SuggestedChatSection from "@features/chat/components/sections/SuggestedChatSection";
import ChatInputSection from "@features/chat/components/sections/ChatInputSection";
import ChatSection from "@features/chat/components/sections/ChatSection";
import Settings from "@features/settings/components/Settings";

// layouts
import ChatBoxHeader from "@features/chat/layouts/header/ChatBoxHeader";

type ChatBoxProps = {
  closeUsing: MouseEventHandler<HTMLButtonElement>;
};

const ChatBox = ({ closeUsing }: ChatBoxProps) => {
  const {
    latestChat,
    questionsListRef,
    settings,
    isFaqsMenuActive,
    setIsFaqsMenuActive,
    userMessage,
    setUserMessage,
    toggleSettings,
    sendMessageToBot,
    sendSuggestedQueryToBot,
  } = useChatbot();
  const font = useContext(FontContext);
  const { fontFamily } = font.family;
  const chat = useContext(ChatContext);
  const { isChatActive } = chat.active;

  return (
    <>
      <div
        id="message-box"
        className={`w-full h-full xl:max-w-[500px] fixed flex flex-col items-center xl:right-[10%] xl:bottom-[8%] bg-background dark:bg-dm-background xl:rounded-xl overflow-hidden z-[100] ${
          isChatActive ? "" : "translate-y-full opacity-0 invisible"
        } [@media_((min-height:0px)_and_(min-width:1280px))]:max-h-[85%]`}
        style={{
          fontFamily: fontFamily,
        }}
      >
        <ChatBoxHeader
          toggleSettings={toggleSettings}
          closeUsing={closeUsing}
        />
        <ChatSection latestChat={latestChat} />
        <SuggestedChatSection
          sendSuggestedQueryToBot={sendSuggestedQueryToBot}
        />
        <ChatInputSection
          questionsListRef={questionsListRef}
          sendMessageToBot={sendMessageToBot}
          sendSuggestedQueryToBot={sendSuggestedQueryToBot}
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          isFaqsMenuActive={isFaqsMenuActive}
          setIsFaqsMenuActive={setIsFaqsMenuActive}
        />
        <div className="text-xs text-center text-black/70 dark:text-white/50 py-3 px-5">
          The Chatbot can make mistake. Please double check the answers.
        </div>
      </div>
      <Settings settings={settings} toggleSettings={toggleSettings} />
    </>
  );
};

export default ChatBox;
