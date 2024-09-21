import { useState, useEffect, useMemo } from "react";
import { SoundContext } from "../contexts/SoundContext";

const SoundProvider = ({ children }) => {
  const [chatSentSound, setChatSentSound] = useState(
    localStorage.getItem("chatSentSound"),
  );

  useEffect(() => {
    if (localStorage.getItem("chatSentSound") == null) {
      const initialMessegeSentSound = "minimalpop";

      setChatSentSound(initialMessegeSentSound);
      localStorage.setItem("chatSentSound", initialMessegeSentSound);
    }
  }, []);

  const sound = useMemo(() => {
    return {
      sound: {
        messageSent: [chatSentSound, setChatSentSound],
      },
    };
  }, [chatSentSound, setChatSentSound]);

  return (
    <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>
  );
};

export default SoundProvider;
