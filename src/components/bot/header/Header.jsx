// library
import { chatbotConfig } from "../../../lib/bot/chatbotConfig";

// components
import CloseChatBtn from "../buttons/CloseChatBtn";
import SettingsBtn from "../buttons/SettingsBtn";

const Header = ({ toggleSettings, settings, closeUsing }) => {
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
      <menu className="flex gap-1 justify-end">
        <SettingsBtn onClick={() => toggleSettings()} state={settings} />
        <CloseChatBtn onClick={closeUsing} />
      </menu>
    </header>
  );
};

export default Header;
