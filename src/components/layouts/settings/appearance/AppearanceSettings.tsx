// components
import SettingsTitle from "@src/components/layouts/settings/SettingsTitle";
import ChatPreview from "@src/components/layouts/previews/ChatPreview";
import ThemeSwitch from "@src/components/layouts/settings/appearance/themes/ThemeSwitch";
import FontFamilySwitch from "@src/components/layouts/settings/appearance/fonts/FontFamilySwitch";
import FontSizeSwitch from "@src/components/layouts/settings/appearance/fonts/FontSizeSwitch";
import SettingsWrapper from "@src/components/layouts/settings/SettingsWrapper";
import ChatHeadSwitch from "@src/components/layouts/settings/appearance/chathead/ChatHeadSwitch";

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
