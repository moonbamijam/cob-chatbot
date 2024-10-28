import React from "react";
import { ConversationType } from "../shared/ts/type";

type UserContextType = {
  uid: string;
  conversation: ConversationType[];
  rating?: number;
};

export const UserContext = React.createContext({} as UserContextType);
