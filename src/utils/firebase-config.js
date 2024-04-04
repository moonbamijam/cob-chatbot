import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// NOTICE!: uncomment the production config and comment the dev config
// once you're going to use our original db
// REMINDER!: please set up the .env variables before running in dev

// PRODUCTION
// const firebaseConfig = {
//   apiKey: `${import.meta.env.APIKEY}`,
//   authDomain: `${import.meta.env.AUTHDOMAIN}`,
//   projectId: "cob-chatbot",
//   storageBucket: `${import.meta.env.STORAGEBUCKET}`,
//   messagingSenderId: `${import.meta.env.MESSAGINGSENDERID}`,
//   appId: `${import.meta.env.APPID}`,
// };

// DEVELOPMENT
const firebaseConfig = {
  apiKey: `${import.meta.env.APIKEYDEV}`,
  authDomain: `${import.meta.env.AUTHDOMAINDEV}`,
  projectId: "chatbot-test-49529",
  storageBucket: `${import.meta.env.STORAGEBUCKETDEV}`,
  messagingSenderId: `${import.meta.env.MESSAGINGSENDERIDDEV}`,
  appId: `${import.meta.env.APPIDDEV}`,
  measurementId: `${import.meta.env.MEASUREMENTIDDEV}`,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
