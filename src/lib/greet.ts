import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@constants/firebase/config";
import { v4 as uuid } from "uuid";
import { chatType } from "@shared/ts/type";

const usersCollectionRef = collection(db, "users");

export const greet = async (uid: string, message: string) => {
  try {
    const botChat: chatType = {
      intent: "greetings",
      chat: message,
      chatId: uuid(),
      role: "bot",
      timestamp: Timestamp.now(),
    };

    await setDoc(doc(usersCollectionRef, uid), {
      conversation: [botChat],
    });
  } catch (error) {
    console.log(error);
  }
};
