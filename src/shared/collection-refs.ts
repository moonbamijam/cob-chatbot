import { collection } from "firebase/firestore";

// constants
import { db } from "@constants/firebase/config";

// utils
import { firestoreConverter } from "@utils/type-converter";

// type
import { FaqType } from "@shared/ts/type";

export const usersCollectionRef = collection(db, "users");

export const faqsCollectionRef = collection(db, "FAQs").withConverter(
  firestoreConverter<FaqType>(),
);
