import { useContext } from "react";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { ChatbotContext } from "../../contexts/ChatbotContext";

// hooks
import useChatbot from "../../hooks/useChatbot";

// components
import Loading from "./ui/Loading";

const ChatHead = ({ onClick }) => {
  const { auth } = useContext(AuthContext);
  const [isSignedIn] = auth.user;
  const { chatbot } = useContext(ChatbotContext);
  const [configuration] = chatbot.configuration;
  const { chat } = useContext(ChatContext);
  const [isChatActive] = chat.active;
  const { isAtLatestChat } = useChatbot();

  return (
    <>
      {isSignedIn && isAtLatestChat && configuration.widgetIcon ? (
        <button
          onClick={() => onClick()}
          id=""
          className={`fixed right-[2%] bottom-[2%] rounded-full z-[100] ${
            isChatActive ? "opacity-0 translate-y-[100%] invisible" : ""
          }`}
        >
          <img
            src={configuration.widgetIcon}
            alt="chat head logo"
            className="w-[400px]"
          />
        </button>
      ) : (
        <div className="fixed bottom-[10%] right-[20%] lg:right-[10%] z-[100] [&>div>svg>path]:text-primary xl:[&>div>svg>path]:text-white ">
          <Loading />
        </div>
      )}
    </>
  );
};

export default ChatHead;
