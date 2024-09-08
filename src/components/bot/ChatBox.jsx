import { useContext } from "react";

// Contexts & Providers
import { FontContext } from "../../contexts/FontProvider";

// Hooks
import useChatbot from "../../hooks/useChatbot";

// Utilities
import { scrollInto } from "../../utils/scrollInto";

// Components
import Messages from "./sections/Messages";
import Header from "./header/Header";
import MessageInput from "./input/MessageInput";
import Settings from "./settings/Settings";
import SuggestedMessages from "./sections/SuggestedMessages";

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
        className={`w-full h-full xl:w-[500px] xl:h-[700px] fixed flex flex-col items-center xl:right-24 2xl:right-36 xl:bottom-20 2xl:bottom-32 bg-background dark:bg-dm-background xl:rounded-xl overflow-hidden z-[100] ${className}`}
        style={{
          fontFamily: fontFamily,
        }}
      >
        <Header
          toggleSettings={toggleSettings}
          settings={settings}
          closeUsing={closeUsing}
        />
        <Messages
          settings={settings}
          botIsTyping={botIsTyping}
          latestMessage={latestMessage}
        />
        <SuggestedMessages
          sendMessageToBot={sendMessageToBot}
          settings={settings}
        />
        <MessageInput
          faqsRef={faqsRef}
          sendMessageToBot={sendMessageToBot}
          sendFaqToBot={sendFaqToBot}
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          settings={settings}
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
