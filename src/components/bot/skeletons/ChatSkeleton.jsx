import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import useChatbot from "../../../hooks/useChatbot";
import SkeletonScreen from "../ui/SkeletonScreen";

const ChatSkeleton = () => {
  const { messagesQuery } = useChatbot();
  const [skeletonizedChat, setSkeletonizedChat] = useState([]);

  // get messages independently from useChatbot hook
  const getMessagesToSkeletonized = async () => {
    const data = await getDocs(messagesQuery);
    setSkeletonizedChat(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  // render those skeletonized messages once
  useEffect(() => {
    getMessagesToSkeletonized();
  }, []);

  return (
    <div className="">
      {skeletonizedChat.map((skeletonizedChat, i) => (
        <div
          key={i}
          className={`${
            skeletonizedChat.role == "bot"
              ? "w-full relative flex items-center gap-2"
              : "w-full flex justify-end"
          } mt-3 mb-2`}
        >
          {skeletonizedChat.role == "bot" ? (
            <div className="bg-gray-300 w-[35px] h-[35px] rounded-full select-none animate-pulse"></div>
          ) : null}
          <SkeletonScreen
            id="chat"
            width={`${
              skeletonizedChat.role === "bot" ? "w-full" : "w-[216px]"
            }`}
            height={`${
              skeletonizedChat.role === "bot" ? "h-[96px]" : "h-[64px]"
            }`}
            customStyles={`${
              skeletonizedChat.role == "bot"
                ? "bg-gray-300 dark:bg-gray-700"
                : "bg-primary"
            } `}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
