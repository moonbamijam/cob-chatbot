import { useState, useRef, useEffect } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

import ChatHead from "./components/bot/ChatHead";
import ChatBox from "./components/bot/ChatBox";
import Page from "./components/page/Page";


// Providers
import ThemesProvider from "./providers/ThemesProvider";
import FontSizeProvider from "./providers/FontSizeProvider";
import LargeScreenProvider from "./providers/LargeScreenProvider";



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
        console.error('Error occured: ', error);
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
          <LargeScreenProvider>
            <ThemesProvider>
              <FontSizeProvider>
                {isSignedIn ? (
                  <ChatHead state={isChatActive} onClick={() => toggleChat()} />
                ) : (
                  null
                )}

                <ChatBox
                  className={
                    isChatActive
                      ? "opacity-100 visible"
                      : "opacity-0 -translate-y-[100%] invisible"
                  }
                  closeUsing={toggleChat}
                />
              </FontSizeProvider>
            </ThemesProvider>
          </LargeScreenProvider>
        </div>
        <Page />
        <div
          id="screen-dimmer"
          className={`w-full h-full fixed z-[90] bg-black ${
            isChatActive ? "opacity-80" : "opacity-0 invisible"
          } flex justify-center items-center pr-[30%]`}
        >
          <p className="text-lg text-gray-300 animate-bounce select-none">
            Click anywhere to close.
          </p>
        </div>
      </main>
    </>
  );
};

export default App;
