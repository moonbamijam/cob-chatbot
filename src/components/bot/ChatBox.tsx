import { MouseEventHandler, useContext } from "react";

// contexts
import { FontContext } from "../../contexts/FontContext";
import { ChatContext } from "../../contexts/ChatContext";

// hooks
import useChatbot from "../../hooks/useChatbot";

// components
import Header from "../bot/header/Header";
import Settings from "./settings/Settings";
import SuggestedChatSection from "./sections/SuggestedChatSection";
import ChatInputSection from "./sections/ChatInputSection";
import ChatSection from "./sections/ChatSection";

type ChatBoxProps = {
  closeUsing: MouseEventHandler<HTMLButtonElement>;
};

const ChatBox = ({ closeUsing }: ChatBoxProps) => {
  const {
    latestChat,
    faqsRef,
    settings,
    isFaqsMenuActive,
    setIsFaqsMenuActive,
    userMessage,
    setUserMessage,
    botIsTyping,
    toggleSettings,
    sendMessageToBot,
    sendFaqToBot,
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
          isChatActive ? "opacity-100 visible" : "opacity-0 invisible"
        } [@media_((min-height:0px)_and_(min-width:1280px))]:max-h-[85%]`}
        style={{
          fontFamily: fontFamily,
        }}
      >
        <Header toggleSettings={toggleSettings} closeUsing={closeUsing} />
        <ChatSection botIsTyping={botIsTyping} latestChat={latestChat} />
        <SuggestedChatSection sendMessageToBot={sendMessageToBot} />
        <ChatInputSection
          faqsRef={faqsRef}
          sendMessageToBot={sendMessageToBot}
          sendFaqToBot={sendFaqToBot}
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          isFaqsMenuActive={isFaqsMenuActive}
          setIsFaqsMenuActive={setIsFaqsMenuActive}
        />
      </div>
      <Settings settings={settings} toggleSettings={toggleSettings} />
    </>
  );
};

export default ChatBox;
