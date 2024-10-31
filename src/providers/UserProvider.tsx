import { useContext, useMemo } from "react";
// contexts
import { UserContext } from "@contexts/UserContext";
import { ChatbotContext } from "@contexts/ChatbotContext";

// utils
import { verifiedUID } from "@utils/uid";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const uid = verifiedUID();
  const chatbot = useContext(ChatbotContext);
  const { conversation } = chatbot.conversation;

  const user = useMemo(() => {
    return {
      uid: uid,
      conversation: conversation,
    };
  }, [uid, conversation]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
