import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaVolumeHigh, FaCode, FaUserShield } from "react-icons/fa6";

export const settingsList = [
  {
    name: "appearance",
    settingType: "chat",
    icon: IoChatbubbleEllipsesOutline,
  },
  {
    name: "sound",
    settingType: "chat",
    icon: FaVolumeHigh,
  },
  {
    name: "developers",
    settingType: "about",
    icon: FaCode,
  },
  {
    name: "security",
    settingType: "about",
    icon: FaUserShield,
  },
];
