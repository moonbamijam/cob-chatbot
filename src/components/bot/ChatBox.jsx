import { useContext } from "react";

// Contexts & Providers
import { FontContext } from "../../contexts/FontProvider";
import { LargeScreenContext } from "../../contexts/LargeScreenProvider";

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
    error,
    loading,
    isFaqsMenuActive,
    setIsFaqsMenuActive,
    userMessage,
    setUserMessage,
    botIsTyping,
    messages,
    faqs,
    toggleSettings,
    sendMessageToBot,
    sendFaqToBot,
  } = useChatbot();

  const { font } = useContext(FontContext);
  const [fontFamily] = font.family;
  const [isLargeScreen, setIsLargeScreen] = useContext(LargeScreenContext);

  const toggleLargeScreen = () => {
    setIsLargeScreen(!isLargeScreen);
    scrollInto(latestMessage);
  };

  return (
    <>
      <div
        id="message-box"
        className={`${
          isLargeScreen
            ? "w-[700px] h-[750px] md:w-[750px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]"
            : "w-full h-full xl:w-[500px] xl:h-[700px]"
        } fixed flex flex-col xl:right-24 2xl:right-36 xl:bottom-20 2xl:bottom-32 bg-background dark:bg-dm-background xl:rounded-xl overflow-hidden z-[100] ${className}`}
        style={{
          fontFamily: fontFamily,
        }}
      >
        <Header
          toggleSettings={toggleSettings}
          toggleLargeScreen={toggleLargeScreen}
          isLargeScreen={isLargeScreen}
          settings={settings}
          closeUsing={closeUsing}
        />
        <Messages
          settings={settings}
          loading={loading}
          messages={messages}
          botIsTyping={botIsTyping}
          error={error}
          latestMessage={latestMessage}
        />
        <SuggestedMessages
          sendMessageToBot={sendMessageToBot}
          settings={settings}
        />
        <MessageInput
          faqsRef={faqsRef}
          faqs={faqs}
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
