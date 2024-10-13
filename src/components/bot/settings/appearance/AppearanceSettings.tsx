// components
import SettingsTitle from "../SettingsTitle";
import ChatPreview from "../../ui/ChatPreview";
import ThemeSwitch from "./themes/ThemeSwitch";
import FontFamilySwitch from "./fonts/FontFamilySwitch";
import FontSizeSwitch from "./fonts/FontSizeSwitch";
import SettingsWrapper from "../SettingsWrapper";
import ChatHeadSwitch from "./chathead/ChatHeadSwitch";

const AppearanceSettings = () => {
  return (
    <>
      <section className="flex flex-col gap-8">
        <SettingsTitle text="appearance" />
        <div className="flex flex-col 2xl:flex-row 2xl:justify-between gap-y-10 gap-x-6">
          <SettingsWrapper>
            <ThemeSwitch />
            <FontFamilySwitch />
            <FontSizeSwitch />
            <ChatHeadSwitch />
          </SettingsWrapper>
          <ChatPreview />
        </div>
        <hr className="w-full border-surface-dark dark:border-dm-surface-light" />
      </section>
    </>
  );
};

export default AppearanceSettings;
