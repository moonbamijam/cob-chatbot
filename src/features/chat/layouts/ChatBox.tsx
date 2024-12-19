import { MouseEventHandler, useContext, useState } from "react";

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

  const [isLargeScreen, setIslargeScreen] = useState(false);

  const toggleLargeScreen = () => {
    setIslargeScreen(!isLargeScreen);
  };

  return (
    <>
      <div
        id="message-box"
        className={`w-full h-full ${isLargeScreen ? "xl:max-w-full xl:right-0 xl:bottom-0 [@media_((min-height:0px)_and_(min-width:1280px))]:max-h-full" : "xl:max-w-[500px] xl:right-[10%] xl:bottom-[8%] xl:rounded-xl [@media_((min-height:0px)_and_(min-width:1280px))]:max-h-[85%]"} fixed flex flex-col items-center bg-background dark:bg-dm-background overflow-hidden z-[100] selection:bg-primary selection:text-white ${
          isChatActive ? "" : "translate-y-full opacity-0 invisible"
        }`}
        style={{
          fontFamily: fontFamily,
        }}
      >
        <ChatBoxHeader
          isLargeScreen={isLargeScreen}
          toggleLargeScreen={toggleLargeScreen}
          toggleSettings={toggleSettings}
          closeUsing={closeUsing}
        />
        <ChatSection latestChat={latestChat} isLargeScreen={isLargeScreen} />
        <SuggestedChatSection
          sendSuggestedQueryToBot={sendSuggestedQueryToBot}
          isLargeScreen={isLargeScreen}
        />
        <ChatInputSection
          questionsListRef={questionsListRef}
          sendMessageToBot={sendMessageToBot}
          sendSuggestedQueryToBot={sendSuggestedQueryToBot}
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          isFaqsMenuActive={isFaqsMenuActive}
          setIsFaqsMenuActive={setIsFaqsMenuActive}
          isLargeScreen={isLargeScreen}
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
