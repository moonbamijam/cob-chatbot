import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// NOTICE!: replace the argument in the getFirebaseConfig call
// to use the corresponding database configuration
// REMINDER!: please set up the .env variables before running in dev

const getFirebaseConfig = (projectMode) => {
  let config = {};
  // PRODUCTION
  if (projectMode.toLowerCase() === "production") {
    config = {
      apiKey: `${import.meta.env.VITE_APIKEY}`,
      authDomain: `${import.meta.env.AUTHDOMAIN}`,
      projectId: "cob-chatbot",
      storageBucket: `${import.meta.env.STORAGEBUCKET}`,
      messagingSenderId: `${import.meta.env.MESSAGINGSENDERID}`,
      appId: `${import.meta.env.APPID}`,
    };
  }
  // DEVELOPMENT
  if (projectMode.toLowerCase() === "development") {
    config = {
      apiKey: `${import.meta.env.VITE_APIKEYDEV}`,
      authDomain: `${import.meta.env.AUTHDOMAINDEV}`,
      projectId: "chatbot-dev-322c6",
      storageBucket: `${import.meta.env.STORAGEBUCKETDEV}`,
      messagingSenderId: `${import.meta.env.MESSAGINGSENDERIDDEV}`,
      appId: `${import.meta.env.APPIDDEV}`,
      measurementId: `${import.meta.env.MEASUREMENTIDDEV}`,
    };
  }
  if (!["production", "development"].includes(projectMode.toLowerCase())) {
    console.error("Invalid projectMode:", projectMode);
  }
  return config;
};
// Modify the argument accordingly
const firebaseConfig = getFirebaseConfig("development");

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
