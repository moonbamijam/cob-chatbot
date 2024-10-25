import { useState, useEffect, useMemo } from "react";
import { SoundContext } from "@contexts/SoundContext";

const getChatSentSound = () => {
  const chatSentSound = localStorage.getItem("chatSentSound");
  return chatSentSound ? chatSentSound : "minimalpop";
};

const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatSentSound, setChatSentSound] = useState(getChatSentSound);

  // listener
  useEffect(() => {
    localStorage.setItem("chatSentSound", chatSentSound);
  }, [chatSentSound]);

  const sound = useMemo(() => {
    return {
      chatSent: { chatSentSound, setChatSentSound },
    };
  }, [chatSentSound, setChatSentSound]);

  return (
    <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>
  );
};

export default SoundProvider;
