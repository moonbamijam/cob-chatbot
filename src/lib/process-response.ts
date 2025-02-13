import { Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { files, images, videos } from "@shared/file-extensions";
import { chatType, deptsType } from "@shared/ts/type";

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
  intent: string,
  link: string,
  linkMessage?: string,
): chatType => {
  chatData = {
    intent: intent,
    chat: null,
    chatId: uuid(),
    link: link,
    linkMessage: linkMessage ? linkMessage : "Click here",
    role: "bot",
    timestamp: Timestamp.now(),
  };
  return chatData;
};

export const processDepartmentServicesResponse = (
  response: string | deptsType,
  deptsAnswer: string,
  depts: deptsType,
): chatType => {
  if (response === deptsAnswer) {
    chatData = {
      chat: response,
      chatId: uuid(),
      role: "bot",
      timestamp: Timestamp.now(),
    };
  } else {
    chatData = {
      chat: null,
      chatId: uuid(),
      role: "bot",
      depts: depts,
      timestamp: Timestamp.now(),
    };
  }
  return chatData;
};

export const processFileWithLinkResponse = (
  intent: string,
  response: string,
  link: string,
  fileLink: string,
  fileName: string,
  fileExtension: string,
): chatType => {
  if (images.includes(fileExtension)) {
    if (response === link) {
      chatData = {
        intent: intent,
        link: link,
        chat: null,
        chatId: uuid(),
        role: "bot",
        timestamp: Timestamp.now(),
      };
    } else {
      chatData = {
        intent: intent,
        image: fileLink,
        chat: null,
        chatId: uuid(),
        role: "bot",
        timestamp: Timestamp.now(),
      };
    }
  } else if (videos.includes(fileExtension)) {
    if (response === link) {
      chatData = {
        intent: intent,
        link: link,
        chat: null,
        chatId: uuid(),
        role: "bot",
        timestamp: Timestamp.now(),
      };
    } else {
      chatData = {
        intent: intent,
        video: fileLink,
        chat: null,
        chatId: uuid(),
        role: "bot",
        timestamp: Timestamp.now(),
      };
    }
  } else if (files.includes(fileExtension)) {
    if (response === link) {
      chatData = {
        intent: intent,
        link: link,
        chat: null,
        chatId: uuid(),
        role: "bot",
        timestamp: Timestamp.now(),
      };
    } else {
      chatData = {
        intent: intent,
        file: fileName,
        fileLink: fileLink,
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
