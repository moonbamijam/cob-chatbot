import { useState, useMemo, useEffect } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { AuthContext } from "@contexts/AuthContext";

const getInitialStates = () => {
  const isSignedIn = localStorage.getItem("isSignedIn");
  return isSignedIn ? isSignedIn : false;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(getInitialStates);
  const auth = getAuth();
  signInAnonymously(auth);

  // listener
  useEffect(() => {
    localStorage.setItem("isSignedIn", isSignedIn.toString());
  }, [isSignedIn]);

  const authValue = useMemo(() => {
    return {
      user: { isSignedIn, setIsSignedIn },
    };
  }, [isSignedIn]);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
