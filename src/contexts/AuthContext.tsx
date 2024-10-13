import React from "react";

type AuthContextType = {
  user: {
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export const AuthContext = React.createContext({} as AuthContextType);
