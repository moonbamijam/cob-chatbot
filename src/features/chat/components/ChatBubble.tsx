import { useContext } from "react";
import { FontContext } from "@/contexts/FontContext";

type ChatBubbleProps = Partial<
  Readonly<{
    children: React.ReactNode;
    className: string;
    role: string;
    timestamp: string;
  }>
>;

const ChatBubble = ({
  children,
  className,
  role,
  timestamp,
}: ChatBubbleProps) => {
  const font = useContext(FontContext);
  const { fontSize } = font.size;

  const renderChatBubble = () => {
    switch (role) {
      case "user":
        return (
          <div
            className={`rounded-3xl shadow px-4 py-3 space-y-2 break-words ${className}`}
          >
            <div
              id="message"
              style={{ fontSize: fontSize }}
              className="relative dark:text-white whitespace-pre-line"
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
            className={`rounded-3xl shadow bg-surface dark:bg-dm-surface px-4 py-3 space-y-2 break-words ${className}`}
          >
            <div
              id="message"
              style={{ fontSize: fontSize }}
              className="relative dark:text-white whitespace-pre-line"
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
