import React, { useState, useRef, useEffect } from "react";
import ChatHead from "./components/bot/ChatHead";
import MessageBox from "./components/bot/MessageBox";
import Page from "./components/Page";

const App = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

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

  useEffect(() => {
    if (theme === "dark") {
      window.matchMedia("prefer-color-scheme: dark");
      localStorage.setItem("theme", "dark");
    } else {
      window.matchMedia("prefer-color-scheme: light");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <>
      <main className="flex flex-col">
        <div ref={chatHead} id="chathead-wrapper">
          <ChatHead state={isChatActive} onClick={() => toggleChat()} />
          {isChatActive && <MessageBox />}
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
