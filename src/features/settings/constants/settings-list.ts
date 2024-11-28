import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaVolumeHigh, FaUserShield } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";

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
    name: "chatbot team",
    settingType: "about",
    icon: MdGroups,
  },
  {
    name: "security",
    settingType: "about",
    icon: FaUserShield,
  },
];
