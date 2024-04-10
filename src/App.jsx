import React, { useState, useRef, useEffect } from "react";
import ChatHead from "./components/bot/ChatHead";
import ChatBox from "./components/bot/ChatBox";
import Page from "./components/page/Page";

// Context
import ThemesProvider from "./providers/ThemesProvider";
import FontSizeProvider from "./providers/FontSizeProvider";

const App = () => {
  const [isChatActive, setIsChatActive] = useState(false);

  const chatHead = useRef();
  const toggleChat = () => {
    setIsChatActive(!isChatActive);
  };
  useEffect(() => {
    const handleChatHead = (event) => {
      if (!chatHead.current?.contains(event.target)) setIsChatActive(false);
    };
    document.addEventListener("mousedown", handleChatHead);
  }, [chatHead]);

  return (
    <>
      <main className="flex flex-col">
        <div ref={chatHead} id="chathead-wrapper">
          <ThemesProvider>
            <FontSizeProvider>
              <ChatHead state={isChatActive} onClick={() => toggleChat()} />
              {isChatActive && <ChatBox />}
            </FontSizeProvider>
          </ThemesProvider>
        </div>
        <Page />
        <div
          id="screen-dimmer"
          className={`w-full h-full fixed z-[90] bg-black ${
            isChatActive ? "opacity-80" : "opacity-0 invisible"
          }`}
        ></div>
      </main>
    </>
  );
};

export default App;
