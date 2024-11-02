import { MouseEventHandler, useContext } from "react";

// context
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import Button from "@components/ui/Button";

// icons
import { IoSettingsSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

type HeaderProps = {
  toggleSettings: MouseEventHandler<HTMLButtonElement>;
  closeUsing: MouseEventHandler<HTMLButtonElement>;
};

const ChatBoxHeader = ({ toggleSettings, closeUsing }: HeaderProps) => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot?.configuration || {};

  return (
    <header
      id="chat-ui-header"
      className="w-full flex items-center justify-between px-4 py-2 sm:py-3 lg:py-4 mr-auto border-b-2 dark:border-b-dm-surface-dark"
    >
      <button
        onClick={toggleSettings}
        id="chatbot-detai"
        className="max-w-[60%] w-full flex items-center gap-4"
      >
        <img
          src={configuration?.icon}
          alt="Chatbot Icon"
          width={40}
          height={40}
          className="rounded-full sm:w-[45px] sm:h-[45px] aspect-square object-cover select-none"
        />
        <h3 className="max-w-max text-xl sm:text-2xl capitalize font-semibold dark:text-white truncate">
          {configuration?.name}
        </h3>
      </button>
      <menu className="flex gap-4 justify-end items-center">
        <Button
          variant="icon"
          size="icon"
          className="rounded-full hover:bg-primary hover:rotate-180 [&>svg>path]:hover:text-white [&>svg>path]:dark:text-white"
          onClick={toggleSettings}
        >
          <IoSettingsSharp />
        </Button>
        <Button
          variant="icon"
          size="icon"
          className="hidden xl:block rounded-full hover:bg-error group [&>svg>path]:hover:text-white [&>svg>path]:dark:text-white"
          onClick={closeUsing}
        >
          <IoClose />
        </Button>
      </menu>
    </header>
  );
};

export default ChatBoxHeader;
