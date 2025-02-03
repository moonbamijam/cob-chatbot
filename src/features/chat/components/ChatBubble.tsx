import { useContext } from "react";
import { FontContext } from "@contexts/FontContext";

type ChatBubbleProps = Partial<
  Readonly<{
    children: React.ReactNode;
    className: string;
    role: string;
    timestamp: string;
    toggleFullTimestamp: () => void;
  }>
>;

const ChatBubble = ({
  children,
  className,
  role,
  timestamp,
  toggleFullTimestamp,
}: ChatBubbleProps) => {
  const font = useContext(FontContext);

  const renderChatBubble = () => {
    switch (role) {
      case "user":
        return (
          <div
            className={`rounded-3xl shadow px-4 py-3 space-y-2 break-words selection:bg-secondary selection:text-black ${className}`}
            onClick={toggleFullTimestamp}
            role="container"
          >
            <div
              id="chat"
              style={{ fontSize: font.size?.fontSize }}
              className="relative dark:text-white"
            >
              {children}
            </div>
            <div
              id="timestamp"
              className="w-full text-gray-200 dark:text-gray-300 text-xs text-right opacity-80 z-[9]"
            >
              {timestamp}
            </div>
          </div>
        );
      default:
        return (
          <div
            className={`rounded-3xl shadow px-4 py-3 space-y-2 break-words ${className}`}
            onClick={toggleFullTimestamp}
            role="container"
          >
            <div
              id="chat"
              style={{ fontSize: font.size?.fontSize }}
              className="relative dark:text-white"
            >
              {children}
            </div>
            <div
              id="timestamp"
              className="text-gray-500 dark:text-gray-300 text-xs text-right opacity-80 z-[9]"
            >
              {timestamp}
            </div>
          </div>
        );
    }
  };

  return <>{renderChatBubble()}</>;
};

export default ChatBubble;
