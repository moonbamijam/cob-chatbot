// Components
import MiniProfile from "../sections/MiniProfile";
import BackBtn from "../buttons/BackBtn";
import ScreenDim from "../ui/ScreenDim";
import { useState } from "react";
import { chatbot } from "../../../lib/botDetails";
import SettingsNavBar from "./nav/SettingsNavBar";
import AppearanceSettings from "./appearance/AppearanceSettings";

const Settings = ({ settings, toggleSettings, style }) => {
  const [checked, setChecked] = useState("appearance");

  const handleSettingsChange = (event) => {
    setChecked(event.target.value);
  };

  const changeSetting = (setting) => {
    switch (setting) {
      case "appearance":
        setChecked(setting);
        break;
      default:
        setChecked("appearance");
        break;
    }
  };

  const renderSettings = () => {
    switch (checked) {
      case "appearance":
        return <AppearanceSettings />;
      case chatbot.name.toLowerCase():
        return <MiniProfile state={settings} />;
      default:
        return <AppearanceSettings />;
    }
  };

  return (
    <>
      <section
        className={`fixed top-[5%] inset-x-0 mx-auto max-w-[70%] w-full max-h-[90%] h-full rounded-lg overflow-hidden bg-background dark:bg-dm-surface-light flex z-[150]`}
        style={style}
      >
        <SettingsNavBar
          state={checked}
          handleSettingsChange={handleSettingsChange}
          changeSetting={changeSetting}
        />
        <div className="w-full flex flex-col p-10 dark:bg-dm-background overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark">
          <div className="">{renderSettings()}</div>
        </div>
        <BackBtn
          onClick={toggleSettings}
          className={"absolute top-4 right-4"}
          text={"back"}
        />
      </section>
      <ScreenDim
        className={`${settings ? "backdrop-blur" : "opacity-0 invisible"} bg-black/30 z-[140]`}
      />
    </>
  );
};

export default Settings;
