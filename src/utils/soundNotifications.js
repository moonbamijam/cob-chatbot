import minimalPop from "../assets/sounds/minimal-pop-click.mp3";
import happyPop from "../assets/sounds/happy-pop.mp3";
import multiPop from "../assets/sounds/multi-pop.mp3";
import multiPop5 from "../assets/sounds/multi-pop-5.mp3";
import uwuSound from "../assets/sounds/uwu.mp3";

export const playMessageNotification = () => {
  let audio = new Audio(uwuSound);
  audio.volume = 0.2;
  audio.play();
};

export const playTypingSound = () => {
  let audio = new Audio(multiPop5);
  audio.volume = 0.1;
  audio.play();
};
