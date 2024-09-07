import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaVolumeHigh, FaRobot } from "react-icons/fa6";
import { chatbotConfig } from "../bot/chatbotConfig";

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
    name: chatbotConfig.name.toLowerCase(),
    settingType: "about",
    icon: FaRobot,
  },
];
