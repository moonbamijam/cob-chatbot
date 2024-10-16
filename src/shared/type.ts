import * as admin from "firebase-admin";
import { DocumentData } from "firebase/firestore";
import { IconType } from "react-icons";

export type ConfigurationType = {
  icon: string;
  widgetIcon: string;
  name: string;
  slogan: string;
  initialGreet?: string;
  errorMessage?: string;
};

export type ConversationType = {
  intent: string;
  message: string;
  messageId: string;
  role: string;
  timeSent: admin.firestore.Timestamp;
  depts: {
    id: string;
    deptName: string;
    service: string;
    steps: string;
    requirements: string;
  }[];
};

export type FaqType = {
  answer: string;
  frequency: number;
  questions: string[];
} & DocumentData;

export type SettingsListType = {
  name: string;
  settingType: string;
  icon: IconType;
};
