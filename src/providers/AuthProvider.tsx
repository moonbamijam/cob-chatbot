import { useState, useEffect, useMemo } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // On render sign in user anonymously
  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        setIsSignedIn(true);
      })
      .catch((error) => {
        console.error("Error occured: ", error);
      });
  }, [isSignedIn]);

  const authValue = useMemo(() => {
    return {
      user: { isSignedIn, setIsSignedIn },
    };
  }, [isSignedIn, setIsSignedIn]);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
