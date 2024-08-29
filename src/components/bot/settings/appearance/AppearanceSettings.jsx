import SettingsTitle from "../SettingsTitle";
import ChatPreview from "../../ui/ChatPreview";
import ThemeSwitch from "./themes/ThemeSwitch";
import FontFamilySwitch from "./fonts/FontFamilySwitch";
import FontSizeSwitch from "./fonts/FontSizeSwitch";

const AppearanceSettings = () => {
  return (
    <section className="flex flex-col items-center 2xl:flex-row 2xl:justify-between space-y-10">
      <div className="flex flex-col items-center gap-8">
        <SettingsTitle text="appearance" />
        <ThemeSwitch />
        <FontFamilySwitch />
        <FontSizeSwitch />
      </div>
      <ChatPreview />
    </section>
  );
};

export default AppearanceSettings;
