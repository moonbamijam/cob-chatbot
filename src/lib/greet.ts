import { doc, setDoc, Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { chatType } from "@shared/ts/type";
import { usersCollectionRef } from "@shared/collection-refs";

export const greet = async (uid: string, message: string) => {
  try {
    const chatData: chatType = {
      intent: "greetings",
      chat: message,
      chatId: uuid(),
      role: "bot",
      timestamp: Timestamp.now(),
    };

    await setDoc(doc(usersCollectionRef, uid), {
      uid: uid,
      conversation: [chatData],
    });
  } catch (error) {
    console.log(error);
  }
};
