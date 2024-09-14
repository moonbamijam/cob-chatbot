import { useContext } from "react";

// Contexts & Providers
import { FontContext } from "../../contexts/FontProvider";

// Hooks
import useChatbot from "../../hooks/useChatbot";

// Components
import ChatSection from "./sections/ChatSection";
import Header from "./header/Header";
import ChatInputSection from "./sections/ChatInputSection";
import Settings from "./settings/Settings";
import SuggestedChatSection from "./sections/SuggestedChatSection";

const ChatBox = ({ className, closeUsing }) => {
  const {
    latestMessage,
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
  const { font } = useContext(FontContext);
  const [fontFamily] = font.family;

  return (
    <>
      <div
        id="message-box"
        className={`w-full h-full xl:w-[500px] xl:h-[800px] fixed flex flex-col items-center xl:right-[10%] xl:top-[8%] bg-background dark:bg-dm-background xl:rounded-xl overflow-hidden z-[100] ${className}`}
        style={{
          fontFamily: fontFamily,
        }}
      >
        <Header
          toggleSettings={toggleSettings}
          settings={settings}
          closeUsing={closeUsing}
        />
        <ChatSection botIsTyping={botIsTyping} latestChat={latestMessage} />
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
      {settings && (
        <Settings settings={settings} toggleSettings={toggleSettings} />
      )}
    </>
  );
};

export default ChatBox;
