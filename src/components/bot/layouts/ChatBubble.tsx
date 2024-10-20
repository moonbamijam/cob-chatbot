import { FontContext } from "@src/contexts/FontContext";
import { useContext } from "react";

type ChatBubbleProps = Partial<
  Readonly<{
    children: React.ReactNode;
    className: string;
    role: string;
    timeSent: string;
  }>
>;

const ChatBubble = ({
  children,
  className,
  role,
  timeSent,
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
              id="timeSent"
              className="w-full text-gray-200 dark:text-gray-300 text-xs text-right opacity-80 z-[9]"
            >
              {timeSent}
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
              id="timeSent"
              className="text-gray-500 dark:text-gray-300 text-xs text-right opacity-80 z-[9]"
            >
              {timeSent}
            </div>
          </div>
        );
    }
  };

  return <>{renderChatBubble()}</>;
};

export default ChatBubble;
