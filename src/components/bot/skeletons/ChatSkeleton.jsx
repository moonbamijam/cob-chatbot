import { chatbot } from "../../../lib/bot-details";
import SkeletonScreen from "../ui/SkeletonScreen";

const ChatSkeleton = () => {
  return (
    <div className="">
      <div className="w-full flex justify-end mt-3 mb-2">
        <SkeletonScreen
          id="chat"
          width="w-[316px]"
          height="h-[64px]"
          customStyles="bg-primary"
        />
      </div>
      <div className="w-full relative flex items-center gap-2 mt-3 mb-2">
        <img
          src={chatbot.logo}
          alt="Chatbot Icon"
          width={35}
          height={35}
          className="rounded-full select-none"
        />
        <SkeletonScreen
          id="chat"
          width="w-[364px]"
          height="h-[128px]"
          customStyles="bg-gray-300 dark:bg-gray-700 "
        />
      </div>
      <div className="w-full flex justify-end mt-3 mb-2">
        <SkeletonScreen
          id="chat"
          width="w-[248px]"
          height="h-[64px]"
          customStyles="bg-primary"
        />
      </div>
    </div>
  );
};

export default ChatSkeleton;
