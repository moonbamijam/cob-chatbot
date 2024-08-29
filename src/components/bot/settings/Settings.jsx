import { useState } from "react";
import { chatbot } from "../../../lib/botDetails";

// Components
import MiniProfile from "../sections/MiniProfile";
import BackBtn from "../buttons/BackBtn";
import ScreenDim from "../ui/ScreenDim";
import SettingsNavBar from "./nav/SettingsNavBar";
import AppearanceSettings from "./appearance/AppearanceSettings";
import SoundSettings from "./sound/SoundSettings";

const Settings = ({ settings, toggleSettings }) => {
  const [checked, setChecked] = useState("appearance");

  const handleSettingsChange = (event) => {
    setChecked(event.target.value);
  };

  const changeSetting = (setting) => {
    switch (setting) {
      case "appearance":
        setChecked(setting);
        break;
      case "sound":
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
      case "sound":
        return <SoundSettings />;
      case chatbot.name.toLowerCase():
        return <MiniProfile state={settings} />;
      default:
        return <AppearanceSettings />;
    }
  };

  return (
    <>
      <section
        className={`fixed xl:top-[5%] xl:inset-x-0 mx-auto xl:max-w-[75%] w-full xl:max-h-[90%] h-full xl:rounded-lg overflow-hidden bg-background dark:bg-dm-surface-light flex z-[150]`}
      >
        <SettingsNavBar
          state={checked}
          handleSettingsChange={handleSettingsChange}
          changeSetting={changeSetting}
        />
        <div className="w-full flex flex-col px-6 xl:px-10 py-20 dark:bg-dm-background overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark">
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
