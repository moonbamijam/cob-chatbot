import { ChangeEvent, useContext } from "react";

// contexts
import { SoundContext } from "@contexts/SoundContext";

// hooks
import useSound from "@hooks/useSound";

// constants
import {
  minimalPop,
  happyPop,
  multiPop,
  soundNotificationList,
} from "@features/settings/constants/sound-notification-list";

// components
import RadioButton from "@components/buttons/RadioButton";
import SettingsMiniTitle from "@features/settings/components/SettingsMiniTitle";

// layouts
import Grid from "@layouts/Grid";
import ItemsRenderer from "@layouts/ItemsRenderer";

type SoundType = {
  name: string;
  value: string;
};

const ChatSentSoundSwitch = () => {
  const { playChatSentSound } = useSound();
  const sound = useContext(SoundContext);
  const { chatSentSound, setChatSentSound } = sound.chatSent;

  const handleChatSentSound = (event: ChangeEvent<HTMLInputElement>) => {
    setChatSentSound(event.target.value);
  };

  const changeMessageSentSound = (value: string) => {
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
        <ItemsRenderer
          items={soundNotificationList}
          renderItems={(sound: SoundType) => (
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
          )}
        />
      </Grid>
    </div>
  );
};

export default ChatSentSoundSwitch;
