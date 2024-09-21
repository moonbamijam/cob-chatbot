import { useContext } from "react";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

// hooks
import useChatbot from "../../hooks/useChatbot";

// components
import Loading from "./ui/Loading";

// assets
import Mascot from "../../assets/gif/animated-mascot.gif";

const ChatHead = ({ onClick }) => {
  const { isAtLatestChat } = useChatbot();
  const { auth } = useContext(AuthContext);
  const [isSignedIn] = auth.user;
  const { chat } = useContext(ChatContext);
  const [isChatActive] = chat.active;

  return (
    <>
      {isSignedIn && isAtLatestChat ? (
        <button
          onClick={() => onClick()}
          id=""
          className={`fixed right-12 bottom-12 rounded-full z-[100] ${
            isChatActive ? "opacity-0 translate-y-[100%] invisible" : ""
          }`}
        >
          <img src={Mascot} alt="chat head logo" className="w-[400px]" />
        </button>
      ) : (
        <div className="fixed bottom-[10%] right-[20%] lg:right-[10%] z-[100] [&>div>svg>path]:text-primary">
          <Loading />
        </div>
      )}
    </>
  );
};

export default ChatHead;
