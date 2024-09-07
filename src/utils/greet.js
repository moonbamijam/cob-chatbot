import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { chatbotConfig } from "../lib/bot/chatbotConfig";
import { db } from "../firebase/config";
import { v4 as uuid } from "uuid";

const usersCollectionRef = collection(db, "users");

export const greet = async (uid) => {
  const botMessageInfo = {
    intent: "salutation.greetings",
    message: chatbotConfig.initialGreet,
    messageId: uuid(),
    role: "bot",
    timeSent: Timestamp.now(),
  };

  const res = doc(usersCollectionRef, uid);
  const data = await getDoc(res);
  // this if check will avoid replacing all messages in the conversation everytime the page reloads
  if (!data.exists()) {
    await setDoc(doc(usersCollectionRef, uid), {
      conversation: [botMessageInfo],
    });
  } else console.log("I've already greeted this user, no need to greet again.");
};
