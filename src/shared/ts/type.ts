import * as admin from "firebase-admin";
import { IconType } from "react-icons";

export type ConfigurationType = {
  icon: string;
  widgetIcon: string;
  name: string;
  slogan: string;
  initialGreet?: string;
  errorMessage?: string;
};

export type UserType = {
  uid: string;
  conversation: chatType[] | ConversationType[];
};

export type ConversationType = {
  intent: string;
  chat: string;
  chatId: string;
  image: string;
  video: string;
  file: string;
  fileLink: string;
  fileType: string;
  link: string;
  linkMessage: string;
  role: string;
  timestamp: admin.firestore.Timestamp;
  depts: deptsType;
};

export type ServicesAndProcessType = {
  query: string;
};

export type SettingsListType = {
  name: string;
  settingType: string;
  icon: IconType;
};

export type deptsType = {
  deptName: string;
  service: string;
  steps: string;
  requirements: string;
}[];

export type chatType = {
  intent?: string;
  chat: string | null | undefined;
  chatId: string;
  image?: string;
  video?: string;
  file?: string;
  fileLink?: string;
  fileType?: string;
  link?: string;
  linkMessage?: string;
  depts?: deptsType;
  role: string;
  timestamp: admin.firestore.Timestamp;
};
