import { useContext } from "react";

// assets
import minimalPop from "@static/sounds/minimal-pop-click.mp3";
import happyPop from "@static/sounds/happy-pop.mp3";
import multiPop from "@static/sounds/multi-pop.mp3";
import multiPop5 from "@static/sounds/multi-pop-5.mp3";

// contexts
import { SoundContext } from "@/contexts/SoundContext";

const useSound = () => {
  const sound = useContext(SoundContext);
  const { chatSentSound } = sound.chatSent;

  const playMessageNotification = () => {
    let audio;
    switch (chatSentSound) {
      case "minimalpop":
        audio = new Audio(minimalPop);
        break;
      case "happypop":
        audio = new Audio(happyPop);
        break;
      case "multipop":
        audio = new Audio(multiPop);
        break;
      default:
        audio = new Audio(multiPop);
        break;
    }
    audio.volume = 0.2;
    audio.play();
  };

  const playTypingSound = () => {
    const audio = new Audio(multiPop5);
    audio.volume = 0.1;
    audio.play();
  };

  const playChatSentSound = (audioParams: string) => {
    const audio = new Audio(audioParams);
    audio.volume = 0.2;
    audio.play();
  };

  return {
    playMessageNotification,
    playTypingSound,
    playChatSentSound,
  };
};

export default useSound;
