import React from "react";
import { ConversationType } from "../shared/ts/type";

type UserContextType = {
  uid: string;
  conversation: ConversationType[];
  rating: {
    rating: number;
    setRating: React.Dispatch<React.SetStateAction<number>>;
    averageRating: number;
    hasRated: boolean;
    setHasRated: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export const UserContext = React.createContext({} as UserContextType);
