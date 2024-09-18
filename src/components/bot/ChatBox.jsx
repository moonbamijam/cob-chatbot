import { useContext } from "react";

// contexts
import { FontContext } from "../../contexts/FontProvider";
import { ChatContext } from "../../contexts/ChatContext";

// Hooks
import useChatbot from "../../hooks/useChatbot";

// Components
import ChatSection from "./sections/ChatSection";
import Header from "./header/Header";
import ChatInputSection from "./sections/ChatInputSection";
import Settings from "./settings/Settings";
import SuggestedChatSection from "./sections/SuggestedChatSection";

const ChatBox = ({ closeUsing }) => {
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
  const { chat } = useContext(ChatContext);
  const [isChatActive] = chat.active;

  return (
    <>
      <div
        id="message-box"
        className={`w-full h-full xl:w-[500px] xl:h-[800px] fixed flex flex-col items-center xl:right-[10%] xl:top-[8%] bg-background dark:bg-dm-background xl:rounded-xl overflow-hidden z-[100] ${
          isChatActive
            ? "opacity-100 visible"
            : "opacity-0 -translate-y-[100%] invisible"
        }`}
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
