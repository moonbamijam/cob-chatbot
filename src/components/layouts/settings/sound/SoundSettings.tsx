import SettingsTitle from "@components/layouts/settings/SettingsTitle";
import SettingsWrapper from "@components/layouts/settings/SettingsWrapper";
import ChatSentSoundSwitch from "@components/layouts/settings/sound/chat-sent/ChatSentSoundSwitch";

const SoundSettings = () => {
  return (
    <section className="flex flex-col gap-8">
      <SettingsTitle text={"sound"} />
      <SettingsWrapper>
        <ChatSentSoundSwitch />
      </SettingsWrapper>
      <hr className="w-full border-surface-dark dark:border-dm-surface-light" />
    </section>
  );
};

export default SoundSettings;
