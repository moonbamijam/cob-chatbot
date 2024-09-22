// db
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

const botProfileCollectionRef = collection(db, "profile");

const getBotProfile = async () => {
  console.log("Getting bot information...");
  // set the default values of the chatbot
  let chatbotConfig = {
    url: import.meta.env.VITE_CHATBOT_API_URL,
    logo: "",
    name: "",
    slogan: "",
    introduction: "The interactive chatbot for the city of Bacoor, Cavite.",
    initialGreet: "",
    errorMessage:
      "Sorry, I can't seem to understand what your saying. Could you please try it again?",
  };
  try {
    onSnapshot(doc(botProfileCollectionRef, "botProfile"), (doc) => {
      chatbotConfig.logo = doc.data().interactionIconURL;
      chatbotConfig.name = doc.data().botName;
      chatbotConfig.slogan = doc.data().metadata.slogan;
      chatbotConfig.initialGreet = `👋 Hello there! My name is ${doc.data().botName}, your friendly chatbot assistant. Welcome to our conversation! Whether you're here for assistance or information I'm here to help. Feel free to ask me anything or simply say hi.`;
    });
    console.log("Bot information received.");
    return chatbotConfig;
  } catch (error) {
    console.log(error);
  }
};

export const chatbotConfig = await getBotProfile();
