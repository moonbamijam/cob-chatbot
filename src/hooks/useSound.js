import minimalPop from "../../static/sounds/minimal-pop-click.mp3";
import happyPop from "../../static/sounds/happy-pop.mp3";
import multiPop from "../../static/sounds/multi-pop.mp3";
import multiPop5 from "../../static/sounds/multi-pop-5.mp3";
import { SoundContext } from "../contexts/SoundProvider";
import { useContext } from "react";

const useSound = () => {
  const { sound } = useContext(SoundContext);
  const [messageSentSound] = sound.messageSent;

  const playMessageNotification = () => {
    let audio;
    switch (messageSentSound) {
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
    let audio = new Audio(multiPop5);
    audio.volume = 0.1;
    audio.play();
  };

  const playMessageSentSound = (audioParams) => {
    let audio = new Audio(audioParams);
    audio.volume = 0.2;
    audio.play();
  };

  return {
    playMessageNotification,
    playTypingSound,
    playMessageSentSound,
  };
};

export default useSound;
