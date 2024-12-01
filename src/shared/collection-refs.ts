import { collection } from "firebase/firestore";

// constants
import { db } from "@constants/firebase/config";

export const usersCollectionRef = collection(db, "users");
export const profileCollectionRef = collection(db, "profile");
