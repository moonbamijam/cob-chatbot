import React, { useState, useRef, useEffect } from "react";
import ChatHead from "./components/bot/ChatHead";
import MessageBox from "./components/bot/MessageBox";
import Page from "./components/Page";

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
              {isChatActive && <MessageBox />}
            </FontSizeProvider>
          </ThemesProvider>
        </div>
        <Page />
        {isChatActive && (
          <div
            id="screen-dimmer"
            className="w-full h-full fixed z-[90] bg-black opacity-80"
          ></div>
        )}
      </main>
    </>
  );
};

export default App;
