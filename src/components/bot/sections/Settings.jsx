// Components
import MiniProfile from "./MiniProfile";
import SettingsTitle from "../ui/SettingsTitle";
import ThemeSwitchBtn from "../buttons/ThemeSwitchBtn";
import FontSizes from "./FontSizes";
import BackBtn from "../buttons/BackBtn";

const Settings = ({ settings, toggleSettings }) => {
  return (
    <section
      className={`${
        settings ? "" : ""
      } px-4 py-6 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500`}
    >
      <MiniProfile state={settings} />
      <SettingsTitle text={"change theme"} />
      <ThemeSwitchBtn />
      <SettingsTitle text={"change font size"} />
      <FontSizes />
      <BackBtn onClick={toggleSettings} text={"back"} />
    </section>
  );
};

export default Settings;
