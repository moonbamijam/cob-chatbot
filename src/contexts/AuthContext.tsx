import React from "react";

type AuthContextType = {
  user: {
    isSignedIn: string | boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<string | boolean>>;
  };
};

export const AuthContext = React.createContext({} as AuthContextType);
