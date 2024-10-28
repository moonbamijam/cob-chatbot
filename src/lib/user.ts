import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { usersCollectionRef } from "../shared/collection-refs";
import { chatType } from "../shared/ts/type";

export const userPost = async (
  uid: string,
  data: chatType,
  rating?: number,
) => {
  const docUserId = doc(usersCollectionRef, uid);
  const verifiedDocUserId = await getDoc(docUserId);
  if (!verifiedDocUserId.exists()) {
    // creates a user with verified uid in users collection
    // then add this bot message to conversation array
    await setDoc(doc(usersCollectionRef, uid), {
      uid: uid,
      conversation: [data],
      rating: rating,
    });
  }
  await updateDoc(doc(usersCollectionRef, uid), {
    conversation: arrayUnion(data),
  });
};
