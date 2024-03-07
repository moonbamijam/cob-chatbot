import React, { useState, useRef, useEffect } from "react";
import Section from "./components/common/Section";
import ChatHead from "./components/bot/ChatHead";
import MessageBox from "./components/bot/MessageBox";

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
        <div
          id="main-logo"
          className="my-4 rounded-full w-[100px] h-[100px] bg-dummyhighlight"
        ></div>
        <Section>
          <div
            id="header-wrapper"
            className="flex justify-between items-center px-8 lg:px-14 pb-8"
          >
            <div
              id="sub-logo"
              className="rounded-md w-16 h-12 bg-dummyhighlight"
            ></div>
            <div
              id="menu"
              className="w-[350px] h-[40px] bg-dummysecondary"
            ></div>
            <div
              id="search"
              className="rounded-xl w-[120px] h-[20px] bg-dummyextra"
            ></div>
          </div>
          <div
            id="content-panel-main"
            className="w-full h-[450px] bg-dummyprimary"
          ></div>
          <div
            id="sub-content-panel-wrapper"
            className="flex justify-evenly px-8 lg:px-14 mt-12"
          >
            <div
              id="content-panel-2"
              className="w-[450px] h-[250px] bg-dummysecondary"
            ></div>
            <div
              id="content-panel-2"
              className="w-[220px] h-[250px] bg-dummyprimary"
            ></div>
          </div>
        </Section>
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
