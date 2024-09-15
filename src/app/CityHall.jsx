import { useState, useRef, useEffect, useContext } from "react";

import ChatHead from "../components/bot/ChatHead";
import ChatBox from "../components/bot/ChatBox";
import ScreenDim from "../components/bot/ui/ScreenDim";

// components
import CityHallUI from "../components/pages/city-hall/CityHallUI";

// Contexts
import { AuthContext } from "../contexts/AuthContext";
import FontProvider from "../contexts/FontProvider";
import SoundProvider from "../contexts/SoundProvider";
import ChatbotProvider from "../providers/ChatbotProvider";

const Home = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  const { auth } = useContext(AuthContext);
  const [isSignedIn] = auth.user;

  const chatHead = useRef();
  const toggleChat = () => {
    setIsChatActive(!isChatActive);
  };

  useEffect(() => {
    const handleChatHead = (event) => {
      if (!chatHead.current?.contains(event.target)) setIsChatActive(false);
    };
    document.addEventListener("mousedown", handleChatHead);
    return () => {
      document.removeEventListener("mousedown", handleChatHead);
    };
  }, [chatHead, isChatActive]);

  return (
    <>
      <main className="">
        <div ref={chatHead}>
          <ChatbotProvider>
            <FontProvider>
              <SoundProvider>
                <ChatHead state={isChatActive} onClick={() => toggleChat()} />
                {isSignedIn && (
                  <ChatBox
                    className={
                      isChatActive
                        ? "opacity-100 visible"
                        : "opacity-0 -translate-y-[100%] invisible"
                    }
                    closeUsing={toggleChat}
                  />
                )}
              </SoundProvider>
            </FontProvider>
          </ChatbotProvider>
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

export default Home;
