import { ChangeEvent, useContext } from "react";

// contexts
import { SoundContext } from "../../../../../contexts/SoundContext.tsx";

// lib
import {
  minimalPop,
  happyPop,
  multiPop,
  soundNotificationList,
} from "../../../../../lib/settings/soundNotificationList.js";

// components
import RadioButton from "../../../buttons/RadioButton.tsx";
import SettingsMiniTitle from "../../SettingsMiniTitle.tsx";
import useSound from "../../../../../hooks/useSound.ts";
import Grid from "../../../common/Grid.tsx";
import ItemsRenderer from "../../../../common/ItemsRenderer.tsx";

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
