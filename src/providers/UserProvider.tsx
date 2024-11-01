import { useContext, useEffect, useMemo, useState } from "react";
import {
  average,
  doc,
  getAggregateFromServer,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// contexts
import { UserContext } from "@contexts/UserContext";
import { ChatbotContext } from "@contexts/ChatbotContext";

// utils
import { verifiedUID } from "@utils/uid";

// refs
import { usersCollectionRef } from "@shared/collection-refs";

const getLocalRating = () => {
  const rating = parseInt(localStorage.getItem("rating") || "");
  return rating ? rating : 0;
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const uid = verifiedUID();
  const chatbot = useContext(ChatbotContext);
  const { conversation } = chatbot.conversation;

  const [rating, setRating] = useState<number>(getLocalRating);
  const [averageRating, setAverageRating] = useState<number>(Number);
  const [hasRated, setHasRated] = useState<boolean>(true);

  const getAverageRating = async () => {
    try {
      const totalRatings = await getAggregateFromServer(usersCollectionRef, {
        rating: average("rating"),
      });
      const result = totalRatings.data().rating?.toFixed(2);
      if (result) setAverageRating(parseFloat(result));
    } catch (error) {
      console.log(error);
    }
  };

  const getRatingFromFirestore = async () => {
    const ratingdoc = await getDoc(doc(usersCollectionRef, uid));
    localStorage.setItem("rating", ratingdoc.data()?.rating);
    setHasRated(true);
  };

  const postRating = async () => {
    if (rating) {
      await updateDoc(doc(usersCollectionRef, uid), {
        rating: rating,
      });
    }
  };

  // listener
  useEffect(() => {
    postRating();
    getRatingFromFirestore();
  }, [rating]);

  useEffect(() => {
    getAverageRating();
  }, []);

  const user = useMemo(() => {
    return {
      uid: uid,
      conversation: conversation,
      rating: { rating, setRating, averageRating, hasRated, setHasRated },
    };
  }, [uid, conversation, rating, averageRating, hasRated]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
