import SettingsTitle from "@features/settings/components/SettingsTitle";
import SettingsWrapper from "@features/settings/components/SettingsWrapper";
import ChatSentSoundSwitch from "@features/settings/components/sound/chat-sent/ChatSentSoundSwitch";

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
