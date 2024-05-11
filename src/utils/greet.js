import { Timestamp, addDoc, collection } from "firebase/firestore";
import { chatbot } from "../lib/botDetails";
import { db } from "../firebase/config";

const messagesCollectionRef = collection(db, "messages");

export const greet = async (uid) => {
  await addDoc(messagesCollectionRef, {
    intent: "salutation.greetings",
    message: chatbot.initialGreet,
    role: "bot",
    timeSent: Timestamp.now(),
    uid: uid,
  });
};
