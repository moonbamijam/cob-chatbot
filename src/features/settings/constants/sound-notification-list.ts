import minimalPopSound from "@static/sounds/minimal-pop-click.mp3";
import happyPopSound from "@static/sounds/happy-pop.mp3";
import multiPopSound from "@static/sounds/multi-pop.mp3";
import uwuSound from "@static/sounds/uwu.mp3";

const minimalPop = minimalPopSound;
const happyPop = happyPopSound;
const multiPop = multiPopSound;
const uwu = uwuSound;

const soundNotificationList = [
  {
    name: "minimal pop",
    value: "minimalpop",
  },
  {
    name: "happy pop",
    value: "happypop",
  },
  {
    name: "multi pop",
    value: "multipop",
  },
];

export { minimalPop, happyPop, multiPop, uwu, soundNotificationList };
