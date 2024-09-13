import chatbotLogo from "../../../static/assets/images/logo.png";

export const chatbotConfig = {
  url: import.meta.env.VITE_CHATBOT_API_URL,
  logo: chatbotLogo,
  name: "Vivienne",
  nickName: "Vivienne",
  slogan: "Tanong mo, sagot ko, dahil at home ka dito!",
  desc: "Introducing Bacoor, Cavite's interactive chatbot. Vivienne, a chatbot tasked with responding to inquiries about Bacoor.",
  introduction: "The interactive chatbot for the city of Bacoor, Cavite.",
  initialGreet:
    "👋 Hello there! My name is Vivienne, your friendly chatbot assistant. Welcome to our conversation! Whether you're here for assistance or information I'm here to help. Feel free to ask me anything or simply say hi.",
  errorMessage:
    "Sorry, I can't seem to understand what your saying. Could you please try it again?",
};
