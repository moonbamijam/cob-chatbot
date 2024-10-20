import { MouseEventHandler, useContext } from "react";

// contexts
import { FontContext } from "@contexts/FontContext";
import { ChatContext } from "@contexts/ChatContext";

// hooks
import useChatbot from "@hooks/useChatbot";

// components
import ChatBoxHeader from "@src/components/layouts/headers/ChatBoxHeader";
import Settings from "@src/components/layouts/settings/Settings";
import SuggestedChatSection from "@src/components/sections/SuggestedChatSection";
import ChatInputSection from "@src/components/sections/ChatInputSection";
import ChatSection from "@src/components/sections/ChatSection";
import { AuthContext } from "@src/contexts/AuthContext";
import { ChatbotContext } from "@src/contexts/ChatbotContext";

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
    isAtLatestChat,
  } = useChatbot();
  const auth = useContext(AuthContext);
  const { isSignedIn } = auth.user;
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;
  const font = useContext(FontContext);
  const { fontFamily } = font.family;
  const chat = useContext(ChatContext);
  const { isChatActive } = chat.active;

  const renderChatBox = () => {
    if (isAtLatestChat && isSignedIn && configuration.icon) {
      return (
        <div
          id="message-box"
          className={`w-full h-full xl:max-w-[500px] fixed flex flex-col items-center xl:right-[10%] xl:bottom-[8%] bg-background dark:bg-dm-background xl:rounded-xl overflow-hidden z-[100] opacity-100  ${
            isChatActive ? "opacity-100 visible" : "xl:opacity-0 xl:invisible"
          } [@media_((min-height:0px)_and_(min-width:1280px))]:max-h-[85%]`}
          style={{
            fontFamily: fontFamily,
          }}
        >
          <ChatBoxHeader
            toggleSettings={toggleSettings}
            closeUsing={closeUsing}
          />
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
      );
    }
  };

  return (
    <>
      {renderChatBox()}
      <Settings settings={settings} toggleSettings={toggleSettings} />
    </>
  );
};

export default ChatBox;
