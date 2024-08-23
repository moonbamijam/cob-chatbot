// Library
import { chatbot } from "../../../lib/botDetails";

// Components
import CloseChatBtn from "../buttons/CloseChatBtn";
import MaximizeBtn from "../buttons/MaximizeBtn";
import SettingsBtn from "../buttons/SettingsBtn";

const Header = ({
  toggleSettings,
  toggleLargeScreen,
  isLargeScreen,
  settings,
  closeUsing,
}) => {
  return (
    <header
      id="chat-ui-header"
      className="w-full flex items-center justify-between px-4 py-4 mr-auto shadow-md "
    >
      <button
        onClick={toggleSettings}
        id="chatbot-detai"
        className="flex items-center gap-4"
      >
        <img
          src={chatbot.logo}
          alt=""
          width={45}
          height={45}
          className="rounded-full"
        />
        <h3 className="text-2xl capitalize font-semibold dark:text-white">
          {chatbot.nickName}
        </h3>
      </button>
      <menu className="flex gap-1 justify-end">
        <MaximizeBtn
          onClick={() => toggleLargeScreen()}
          state={isLargeScreen}
        />
        <SettingsBtn onClick={() => toggleSettings()} state={settings} />
        <CloseChatBtn onClick={closeUsing} />
      </menu>
    </header>
  );
};

export default Header;
