import SettingsTitle from "../SettingsTitle";
import SettingsWrapper from "../SettingsWrapper";
import ChatSentSoundSwitch from "./chat-sent/ChatSentSoundSwitch";

const SoundSettings = () => {
  return (
    <section className="flex flex-col gap-8">
      <SettingsTitle text={"sound"} />
      <SettingsWrapper>
        <ChatSentSoundSwitch />
      </SettingsWrapper>
    </section>
  );
};

export default SoundSettings;
