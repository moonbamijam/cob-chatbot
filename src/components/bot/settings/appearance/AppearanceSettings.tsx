// components
import SettingsTitle from "@components/bot/settings/SettingsTitle";
import ChatPreview from "@components/bot/ui/ChatPreview";
import ThemeSwitch from "@components/bot/settings/appearance/themes/ThemeSwitch";
import FontFamilySwitch from "@components/bot/settings/appearance/fonts/FontFamilySwitch";
import FontSizeSwitch from "@components/bot/settings/appearance/fonts/FontSizeSwitch";
import SettingsWrapper from "@components/bot/settings/SettingsWrapper";
import ChatHeadSwitch from "@components/bot/settings/appearance/chathead/ChatHeadSwitch";

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
