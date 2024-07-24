import { settingsList } from "../../../../lib/settingsList";
import SettingsBtn from "../SettingsBtn";
import SettingsNavSection from "./SettingsNavSection";
import SettingsNavTitle from "./SettingsNavTitle";

import Version from "../../ui/Version";

const SettingsNavBar = ({ checked, handleSettingsChange, changeSetting }) => {
  return (
    <>
      <nav className="absolute top-0 left-0 bottom-0 max-w-[20%] w-full h-full px-4 py-6 flex flex-col justify-between bg-surface-dark/30 dark:bg-dm-surface-dark">
        <div>
          <SettingsNavSection>
            <SettingsNavTitle name="chat settings" />
            {settingsList
              .filter((setting) => {
                return setting.settingType === "chat";
              })
              .map((setting) => (
                <SettingsBtn
                  key={setting.name}
                  name={setting.name}
                  state={checked}
                  onClick={() => changeSetting(setting.name)}
                  onChange={handleSettingsChange}
                />
              ))}
          </SettingsNavSection>
          <SettingsNavSection>
            <SettingsNavTitle name="about" />
            {settingsList
              .filter((setting) => {
                return setting.settingType === "about";
              })
              .map((setting) => (
                <SettingsBtn
                  key={setting.name}
                  name={setting.name}
                  state={checked}
                  onClick={() => changeSetting(setting.name)}
                  onChange={handleSettingsChange}
                />
              ))}
          </SettingsNavSection>
        </div>
        <div>
          <Version className="text-xs px-4 text-black/60 dark:text-white/50" />
        </div>
      </nav>
      <div className="settings-box max-w-[20%] w-full"></div>
    </>
  );
};

export default SettingsNavBar;
