import { useContext } from "react";

import ChatHead from "@components/bot/ChatHead";
import ChatBox from "@components/bot/ChatBox";
import ScreenDim from "@components/bot/ui/ScreenDim";

// contexts
import { ChatContext } from "@contexts/ChatContext";

// providers
import FontProvider from "@providers/FontProvider";
import SoundProvider from "@providers/SoundProvider";
import ChatbotProvider from "@providers/ChatbotProvider";

// components
import CityHallUI from "@components/pages/city-hall/CityHallUI";

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
