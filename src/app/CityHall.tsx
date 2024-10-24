import { useContext } from "react";

// contexts
import { ChatContext } from "@contexts/ChatContext";

// providers
import FontProvider from "@providers/FontProvider";
import SoundProvider from "@providers/SoundProvider";
import ChatbotProvider from "@providers/ChatbotProvider";

// features
import ChatHead from "@features/chat/layouts/ChatHead";
import ChatBox from "@features/chat/layouts/ChatBox";

// layouts
import CityHallUI from "@layouts/CityHallUI";

// components
import ScreenDim from "@components/ScreenDim";

const CityHall = () => {
  const chat = useContext(ChatContext);
  const { isChatActive, setIsChatActive } = chat.active;
  const chatHead = chat.icon;

  const toggleChat = () => {
    setIsChatActive(!isChatActive);
  };

  return (
    <>
      <main className="">
        <div ref={chatHead}>
          <FontProvider>
            <SoundProvider>
              <ChatbotProvider>
                <ChatHead onClick={toggleChat} />
                <ChatBox closeUsing={toggleChat} />
              </ChatbotProvider>
            </SoundProvider>
          </FontProvider>
        </div>
        <CityHallUI />
        <ScreenDim
          message="Click anywhere to close."
          className={`bg-black z-50 backdrop-blur ${
            isChatActive ? "opacity-80" : "opacity-0 invisible"
          }`}
        />
      </main>
    </>
  );
};

export default CityHall;
