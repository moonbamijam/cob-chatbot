import { useContext } from "react";
import { SoundContext } from "../../../../../contexts/SoundProvider";
import {
  minimalPop,
  happyPop,
  multiPop,
  soundNotificationList,
} from "../../../../../lib/settings/soundNotificationList";

// components
import SettingsChangerBtn from "../../../buttons/SettingsChangerBtn";
import SettingsMiniTitle from "../../SettingsMiniTitle";
import useSound from "../../../../../hooks/useSound";
import Grid from "../../../common/Grid";

const MessageSentSoundSwitch = () => {
  const { playMessageSentSound } = useSound();
  const { sound } = useContext(SoundContext);
  const [messageSentSound, setMessageSentSound] = sound.messageSent;

  const handleMessageChange = (event) => {
    setMessageSentSound(event.target.value);
  };

  const changeMessageSentSound = (value) => {
    switch (value) {
      case "minimalpop":
        setMessageSentSound(value);
        localStorage.setItem("messageSentSound", value);
        playMessageSentSound(minimalPop);
        break;
      case "happypop":
        setMessageSentSound(value);
        localStorage.setItem("messageSentSound", value);
        playMessageSentSound(happyPop);
        break;
      case "multipop":
        setMessageSentSound(value);
        localStorage.setItem("messageSentSound", value);
        playMessageSentSound(multiPop);
        break;
      default:
        setMessageSentSound("multipop");
        playMessageSentSound(multiPop);
        break;
    }
  };

  return (
    <div>
      <SettingsMiniTitle text="message sent" />
      <Grid>
        {soundNotificationList.map((sound) => (
          <SettingsChangerBtn
            key={sound.value}
            name="message-sent-sounds"
            id={sound.value}
            value={sound.value}
            checkedIf={messageSentSound == sound.value}
            onChange={handleMessageChange}
            onClick={() => changeMessageSentSound(sound.value)}
            displayedText={sound.name}
          />
        ))}
      </Grid>
    </div>
  );
};

export default MessageSentSoundSwitch;
