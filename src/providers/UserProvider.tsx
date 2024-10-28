import { verifiedUID } from "@utils/uid";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { ChatbotContext } from "../contexts/ChatbotContext";
// import { doc, onSnapshot } from "firebase/firestore";
// import { usersCollectionRef } from "../shared/collection-refs";

// const faqsQuery = query(usersCollectionRef, orderBy("frequency", "desc"));

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const uid = verifiedUID();
  const chatbot = useContext(ChatbotContext);
  const { conversation } = chatbot.conversation;
  const [rating, setRating] = useState<number>();

  const getRating = async () => {
    try {
      // onSnapshot(doc(usersCollectionRef, "users"), (doc) => {
      //   setRating();
      // });
      setRating(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRating();
  }, []);

  const user = useMemo(() => {
    return {
      uid: uid,
      conversation: conversation,
      rating: rating,
    };
  }, [uid, conversation, rating]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
