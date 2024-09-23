import { useState } from "react";

// components
import { Button } from "../../ui/Button";
import ScreenDim from "../ui/ScreenDim";
import SettingsNavBar from "./nav/SettingsNavBar";
import AppearanceSettings from "./appearance/AppearanceSettings";
import SoundSettings from "./sound/SoundSettings";
import About from "./about/About";

// icons
import { CgClose } from "react-icons/cg";
import { useContext } from "react";
import { ChatbotContext } from "../../../contexts/ChatbotContext";

const Settings = ({ settings, toggleSettings }) => {
  const { chatbot } = useContext(ChatbotContext);
  const [configuration] = chatbot.configuration;
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
      case configuration.name:
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
      case configuration.name:
        return <About settings={settings} />;
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
        <div className="w-full pl-[23%] sm:pl-[18%] md:pl-[23%] pr-6 xl:pr-8 py-20 dark:bg-dm-background overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark">
          {renderSettings()}
        </div>
        <Button
          variant="destructiveOutline"
          size="lg"
          className="hidden sm:block absolute top-4 right-20 border-surface dark:border-dm-surface bg-surface dark:bg-dm-surface hover:text-white dark:hover:text-white"
          onClick={toggleSettings}
        >
          back
        </Button>
        <Button
          variant="icon"
          size="icon"
          className="sm:hidden border ml-auto text-error border-surface dark:border-dm-surface bg-surface dark:bg-dm-surface dark:hover:bg-error hover:bg-error [&>svg>path]:hover:text-white absolute top-4 right-10"
          onClick={toggleSettings}
        >
          <CgClose />
        </Button>
      </section>
      <ScreenDim
        className={`${settings ? "backdrop-blur" : "opacity-0 invisible"} bg-black/30 z-[140]`}
      />
    </>
  );
};

export default Settings;
