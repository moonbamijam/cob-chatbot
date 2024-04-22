import { Timestamp, addDoc, collection } from "firebase/firestore";
import { chatbot } from "./bot-details";
import { db } from "../utils/firebase-config";

const messagesCollectionRef = collection(db, "messages");

export const greet = async (uid, setState) => {
  await addDoc(messagesCollectionRef, {
    intent: "salutation.greetings",
    message: chatbot.initialGreet,
    role: "bot",
    timeSent: Timestamp.now(),
    uid: uid,
  });
  setState(chatbot.initialGreet);
};
