import React from "react";
import { ConversationType } from "../shared/ts/type";

type UserContextType = {
  uid: string;
  conversation: ConversationType[];
};

export const UserContext = React.createContext({} as UserContextType);
