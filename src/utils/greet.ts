import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { v4 as uuid } from "uuid";

const usersCollectionRef = collection(db, "users");

export const greet = async (uid: string, message: string) => {
  try {
    const botMessageInfo = {
      intent: "greetings",
      message: message,
      messageId: uuid(),
      role: "bot",
      timeSent: Timestamp.now(),
    };

    await setDoc(doc(usersCollectionRef, uid), {
      conversation: [botMessageInfo],
    });
  } catch (error) {
    console.log(error);
  }
};
