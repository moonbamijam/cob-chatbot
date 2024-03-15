import React, { useState, useRef, useEffect } from "react";
import ChatHead from "./components/bot/ChatHead";
import MessageBox from "./components/bot/MessageBox";
import DummyPage from "./components/DummyPage";

const App = () => {
  const [isChatActive, setIsChatActive] = useState(false);

  const chatHead = useRef(null);

  useEffect(() => {
    const handleChatHead = (event) => {
      if (!chatHead?.current?.contains(event.target)) setIsChatActive(false);
    };
    document.addEventListener("mousedown", handleChatHead);
  }, [chatHead]);

  return (
    <>
      <main className="flex flex-col items-center px-4">
        <div ref={chatHead} id="chat-head-wrapper">
          <ChatHead state={isChatActive} setState={setIsChatActive} />
          {isChatActive && <MessageBox />}
        </div>
        <DummyPage />
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
