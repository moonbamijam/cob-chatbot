// Components
import MiniProfile from "../sections/MiniProfile";
import BackBtn from "../buttons/BackBtn";
import ScreenDim from "../ui/ScreenDim";
import Fonts from "./Fonts";
import Themes from "./Themes";
import { useState } from "react";
import { chatbot } from "../../../lib/botDetails";
import SettingsNavBar from "./nav/SettingsNavBar";

const Settings = ({ settings, toggleSettings }) => {
  const [checked, setChecked] = useState("themes");

  const handleSettingsChange = (event) => {
    setChecked(event.target.value);
  };

  const changeSetting = (setting) => {
    switch (setting) {
      case "themes":
        setChecked(setting);
        break;
      case "fonts":
        setChecked(setting);
        break;
      case "sounds":
        setChecked(setting);
        break;
      default:
        setChecked("themes");
        break;
    }
  };

  const renderSettings = () => {
    switch (checked) {
      case "themes":
        return <Themes />;
      case "fonts":
        return <Fonts />;
      case "sounds":
        return <div>sup</div>;
      case chatbot.name.toLowerCase():
        return <MiniProfile state={settings} />;
      default:
        return <Themes />;
    }
  };

  return (
    <>
      <section
        className={`fixed top-[5%] inset-x-0 mx-auto max-w-[60%] w-full max-h-[90%] h-full rounded-lg overflow-hidden bg-surface dark:bg-dm-surface-light flex z-[150]`}
      >
        <SettingsNavBar
          checked={checked}
          handleSettingsChange={handleSettingsChange}
          changeSetting={changeSetting}
        />
        <div className="w-full flex flex-col px-4 py-6 dark:bg-dm-background overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark">
          <div className="">{renderSettings()}</div>
        </div>
        <BackBtn
          onClick={toggleSettings}
          className={"absolute top-0 right-4"}
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
