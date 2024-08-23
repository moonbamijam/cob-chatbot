import React, { useState, useEffect, useMemo } from "react";

export const SoundContext = React.createContext();

const SoundProvider = ({ children }) => {
  const [messageSentSound, setMessageSentSound] = useState(
    localStorage.getItem("messageSentSound"),
  );

  useEffect(() => {
    if (localStorage.getItem("messageSentSound") == null) {
      const initialMessegeSentSound = "minimalpop";

      setMessageSentSound(initialMessegeSentSound);
      localStorage.setItem("messageSentSound", initialMessegeSentSound);
    }
  }, []);

  const sound = useMemo(() => {
    return {
      sound: {
        messageSent: [messageSentSound, setMessageSentSound],
      },
    };
  }, [messageSentSound, setMessageSentSound]);

  return (
    <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>
  );
};

export default SoundProvider;
