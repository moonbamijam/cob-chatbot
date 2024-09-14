// library
import { chatbotConfig } from "../../../lib/bot/chatbotConfig";

// components
import { Button } from "../../ui/Button";

// icons
import { IoSettingsSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Header = ({ toggleSettings, closeUsing }) => {
  return (
    <header
      id="chat-ui-header"
      className="w-full flex items-center justify-between px-4 py-2 sm:py-3 lg:py-4 mr-auto shadow-md"
    >
      <button
        onClick={toggleSettings}
        id="chatbot-detai"
        className="flex items-center gap-4"
      >
        <img
          src={chatbotConfig.logo}
          alt=""
          width={40}
          height={40}
          className="rounded-full sm:w-[45px] sm:h-[45px]"
        />
        <h3 className="text-xl sm:text-2xl capitalize font-semibold dark:text-white">
          {chatbotConfig.nickName}
        </h3>
      </button>
      <menu className="flex gap-4 justify-end items-center">
        <Button
          variant="icon"
          size="icon"
          className="rounded-full hover:bg-primary hover:rotate-180 group"
          onClick={() => toggleSettings()}
        >
          <IoSettingsSharp className="[&>path]:group-hover:fill-white" />
        </Button>
        <Button
          variant="icon"
          size="icon"
          className="rounded-full hover:bg-error group"
          onClick={closeUsing}
        >
          <IoClose className="[&>path]:group-hover:fill-white" />
        </Button>
      </menu>
    </header>
  );
};

export default Header;
