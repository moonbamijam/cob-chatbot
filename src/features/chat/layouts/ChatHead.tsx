import { useContext } from "react";

// contexts
import { AuthContext } from "@contexts/AuthContext";
import { ChatContext } from "@contexts/ChatContext";
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import Loading from "@components/Loading";

const ChatHead = ({ onClick }: { onClick: () => void }) => {
  const auth = useContext(AuthContext);
  const { isSignedIn } = auth.user;
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;
  const chat = useContext(ChatContext);
  const { isChatActive } = chat.active;
  const { chatHeadSize } = chat.chatHeadSize;

  return (
    <>
      {isSignedIn && configuration.widgetIcon ? (
        <button
          onClick={onClick}
          id=""
          className={`fixed right-[2%] bottom-[2%] rounded-full overflow-hidden z-[100] ${
            isChatActive ? "scale-0 opacity-0 invisible" : ""
          }`}
        >
          <img
            src={configuration.widgetIcon}
            alt="chat head logo"
            width={chatHeadSize}
            height={chatHeadSize}
            className="aspect-square object-cover"
          />
        </button>
      ) : (
        <div
          style={{ width: chatHeadSize, height: chatHeadSize }}
          className="fixed right-[2%] bottom-[2%] flex items-center justify-center z-[100] [&>div>svg>path]:text-primary xl:[&>div>svg>path]:text-white "
        >
          <Loading />
        </div>
      )}
    </>
  );
};

export default ChatHead;
