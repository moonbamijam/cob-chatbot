import { Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { files, images, videos } from "@shared/file-extensions";
import { chatType } from "@shared/ts/type";

let chatData: chatType = {
  chat: "",
  chatId: "",
  role: "",
  timestamp: Timestamp.now(),
};

export const processFileResponse = (
  fileExtension: string,
  fileName: string,
  response: string,
  intent: string,
  text: string,
): chatType => {
  if (images.includes(fileExtension)) {
    if (response === text) {
      chatData = {
        intent: intent,
        chat: response,
        chatId: uuid(),
        role: "bot",
        timestamp: Timestamp.now(),
      };
    } else {
      chatData = {
        intent: intent,
        image: response,
        chat: null,
        chatId: uuid(),
        role: "bot",
        timestamp: Timestamp.now(),
      };
    }
  } else if (videos.includes(fileExtension)) {
    if (response === text) {
      chatData = {
        intent: intent,
        chat: response,
        chatId: uuid(),
        role: "bot",
        timestamp: Timestamp.now(),
      };
    } else {
      chatData = {
        intent: intent,
        video: response,
        chat: null,
        chatId: uuid(),
        role: "bot",
        timestamp: Timestamp.now(),
      };
    }
  } else if (files.includes(fileExtension)) {
    if (response === text) {
      chatData = {
        intent: intent,
        chat: response,
        chatId: uuid(),
        role: "bot",
        timestamp: Timestamp.now(),
      };
    } else {
      chatData = {
        intent: intent,
        file: fileName,
        fileLink: response,
        fileType: fileExtension,
        chat: null,
        chatId: uuid(),
        role: "bot",
        timestamp: Timestamp.now(),
      };
    }
  }
  return chatData;
};

export const processLinkResponse = (
  linkMessage: string,
  response: string,
  intent: string,
  text: string,
): chatType => {
  if (response === text) {
    chatData = {
      intent: intent,
      chat: response,
      chatId: uuid(),
      role: "bot",
      timestamp: Timestamp.now(),
    };
  } else {
    chatData = {
      intent: intent,
      chat: null,
      chatId: uuid(),
      link: response,
      linkMessage: linkMessage ? linkMessage : "Click here",
      role: "bot",
      timestamp: Timestamp.now(),
    };
  }
  return chatData;
};
