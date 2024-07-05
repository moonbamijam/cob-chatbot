import React, { useEffect, useState } from "react";

export const LargeScreenContext = React.createContext();

const parsedIsLargeScreen = localStorage.getItem("isLargeScreen");

const LargeScreenProvider = ({ children }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(
    parsedIsLargeScreen === "true",
  );

  useEffect(() => {
    if (localStorage.getItem("isLargeScreen") == null) {
      const initialScreenSize = false;
      setIsLargeScreen(initialScreenSize);
      localStorage.setItem("isLargeScreen", initialScreenSize);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLargeScreen", isLargeScreen);
  }, [isLargeScreen]);

  return (
    <LargeScreenContext.Provider value={[isLargeScreen, setIsLargeScreen]}>
      {children}
    </LargeScreenContext.Provider>
  );
};

export default LargeScreenProvider;
