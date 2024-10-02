import { useContext } from "react";

// lib
import {
  minimalPop,
  happyPop,
  multiPop,
  soundNotificationList,
} from "../../../../../lib/settings/soundNotificationList";

// components
import RadioButton from "../../../buttons/RadioButton";
import SettingsMiniTitle from "../../SettingsMiniTitle";
import useSound from "../../../../../hooks/useSound";
import Grid from "../../../common/Grid";

// contexts
import { SoundContext } from "../../../../../contexts/SoundContext";

const ChatSentSoundSwitch = () => {
  const { playChatSentSound } = useSound();
  const { sound } = useContext(SoundContext);
  const [chatSentSound, setChatSentSound] = sound.chatSent;

  const handleChatSentSound = (event) => {
    setChatSentSound(event.target.value);
  };

  const changeMessageSentSound = (value) => {
    switch (value) {
      case "minimalpop":
        setChatSentSound(value);
        localStorage.setItem("chatSentSound", value);
        playChatSentSound(minimalPop);
        break;
      case "happypop":
        setChatSentSound(value);
        localStorage.setItem("chatSentSound", value);
        playChatSentSound(happyPop);
        break;
      case "multipop":
        setChatSentSound(value);
        localStorage.setItem("chatSentSound", value);
        playChatSentSound(multiPop);
        break;
      default:
        setChatSentSound("multipop");
        playChatSentSound(multiPop);
        break;
    }
  };

  return (
    <div>
      <SettingsMiniTitle text="chat sent" />
      <Grid>
        {soundNotificationList.map((sound) => (
          <RadioButton
            key={sound.value}
            name="message-sent-sounds"
            id={sound.value}
            value={sound.value}
            checkedIf={chatSentSound == sound.value}
            onChange={handleChatSentSound}
            onClick={() => changeMessageSentSound(sound.value)}
            displayedText={sound.name}
          />
        ))}
      </Grid>
    </div>
  );
};

export default ChatSentSoundSwitch;
