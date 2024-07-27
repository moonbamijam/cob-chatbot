import FontSizes from "./fonts/FontSizes";
import SettingsTitle from "../SettingsTitle";
import FontFamily from "./fonts/FontFamily";
import ChatPreview from "../../ui/ChatPreview";
import ThemeSwitchBtn from "../../buttons/ThemeSwitchBtn";

const AppearanceSettings = () => {
  return (
    <section className="flex justify-between">
      <div className="flex flex-col gap-8">
        <SettingsTitle text={"appearance"} />
        <ThemeSwitchBtn />
        <FontFamily />
        <FontSizes />
      </div>
      <ChatPreview />
    </section>
  );
};

export default AppearanceSettings;
