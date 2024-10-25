// components
import SettingsTitle from "@features/settings/components/SettingsTitle";
import ChatPreview from "@features/chat/components/previews/ChatPreview";
import ThemeSwitch from "@features/settings/components/appearance/themes/ThemeSwitch";
import FontFamilySwitch from "@features/settings/components/appearance/fonts/FontFamilySwitch";
import FontSizeSwitch from "@features/settings/components/appearance/fonts/FontSizeSwitch";
import SettingsWrapper from "@features/settings/components/SettingsWrapper";
import ChatHeadSwitch from "@features/settings/components/appearance/chathead/ChatHeadSwitch";

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
