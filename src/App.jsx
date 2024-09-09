import { useState, useRef, useEffect } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

import ChatHead from "./components/bot/ChatHead";
import ChatBox from "./components/bot/ChatBox";
import CityHallPage from "./components/pages/city-hall/CityHallPage";
import ScreenDim from "./components/bot/ui/ScreenDim";

// Contexts
import ThemesProvider from "./contexts/ThemesProvider";
import FontProvider from "./contexts/FontProvider";
import SoundProvider from "./contexts/SoundProvider";
import ChatbotProvider from "./providers/ChatbotProvider";

const App = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const chatHead = useRef();
  const toggleChat = () => {
    setIsChatActive(!isChatActive);
  };

  // On render sign in user anonymously
  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        setIsSignedIn(true);
      })
      .catch((error) => {
        console.error("Error occured: ", error);
      });
  }, []);

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
      <main className="flex flex-col">
        <div ref={chatHead}>
          <ChatbotProvider>
            <ThemesProvider>
              <FontProvider>
                <SoundProvider>
                  {isSignedIn ? (
                    <ChatHead
                      state={isChatActive}
                      onClick={() => toggleChat()}
                    />
                  ) : null}
                  <ChatBox
                    className={
                      isChatActive
                        ? "opacity-100 visible"
                        : "opacity-0 -translate-y-[100%] invisible"
                    }
                    closeUsing={toggleChat}
                  />
                </SoundProvider>
              </FontProvider>
            </ThemesProvider>
          </ChatbotProvider>
        </div>
        <CityHallPage />
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

export default App;
