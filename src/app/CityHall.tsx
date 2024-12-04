import { useContext } from "react";
import { Navigate } from "react-router";

// contexts
import { ChatContext } from "@contexts/ChatContext";

// providers
import FontProvider from "@providers/FontProvider";
import SoundProvider from "@providers/SoundProvider";

// features
import ChatHead from "@features/chat/layouts/ChatHead";
import ChatBox from "@features/chat/layouts/ChatBox";

// layouts
import CityHallUI from "@layouts/CityHallUI";

// components
import ScreenDim from "@components/ScreenDim";
import RatingBox from "@features/ratings/RatingBox";

// utils
import PageTitle from "@utils/page-title";

const CityHall = () => {
  const chat = useContext(ChatContext);
  const { isChatActive, setIsChatActive } = chat.active;
  const chatHead = chat.icon;

  const toggleChat = () => {
    setIsChatActive(!isChatActive);
  };

  return (
    <>
      {localStorage.getItem("uid") ? (
        <>
          <PageTitle title="Bacoor Government Center | City of Bacoor Chatbot" />
          <main>
            <div ref={chatHead}>
              <FontProvider>
                <SoundProvider>
                  <ChatHead onClick={toggleChat} />
                  <ChatBox closeUsing={toggleChat} />
                </SoundProvider>
              </FontProvider>
            </div>
            <CityHallUI />
            <ScreenDim
              message="Click anywhere to close."
              className={`bg-black z-40 backdrop-blur ${
                isChatActive ? "opacity-80" : "opacity-0 invisible"
              }`}
            />
            {isChatActive && <RatingBox />}
          </main>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default CityHall;
