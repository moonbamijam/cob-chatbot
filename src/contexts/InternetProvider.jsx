import React, { useEffect, useState } from "react";
import Error from "../components/bot/ui/Error";

export const InternetContext = React.createContext();

const InternetProvider = ({ children }) => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  if (isOnline) {
    return (
      <InternetContext.Provider value={[isOnline, setOnline]}>
        {children}
      </InternetContext.Provider>
    );
  } else if (!isOnline) {
    return <Error message={"no internet connection."} />;
  }
};

export default InternetProvider;
