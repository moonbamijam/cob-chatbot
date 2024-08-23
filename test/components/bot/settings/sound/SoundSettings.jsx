import SettingsTitle from "../SettingsTitle";
import MessageSentSoundSwitch from "./message-sent/MessageSentSoundSwitch";

const SoundSettings = () => {
  return (
    <section className="flex flex-col justify-between gap-8">
      <SettingsTitle text={"sound"} />
      <MessageSentSoundSwitch />
    </section>
  );
};

export default SoundSettings;
