import SettingsTitle from "../SettingsTitle";
import SettingsWrapper from "../SettingsWrapper";
import MessageSentSoundSwitch from "./message-sent/MessageSentSoundSwitch";

const SoundSettings = () => {
  return (
    <section className="flex flex-col gap-8">
      <SettingsTitle text={"sound"} />
      <SettingsWrapper>
        <MessageSentSoundSwitch />
      </SettingsWrapper>
    </section>
  );
};

export default SoundSettings;
