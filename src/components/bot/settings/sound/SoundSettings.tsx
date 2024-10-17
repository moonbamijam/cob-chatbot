import SettingsTitle from "@components/bot/settings/SettingsTitle";
import SettingsWrapper from "@components/bot/settings/SettingsWrapper";
import ChatSentSoundSwitch from "@components/bot/settings/sound/chat-sent/ChatSentSoundSwitch";

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
