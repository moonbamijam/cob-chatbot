import SkeletonScreen from "../ui/SkeletonScreen";

const ChatSkeleton = () => {
  const skeletonizedChat = [
    {
      role: "bot",
    },
    {
      role: "user",
    },
    {
      role: "bot",
    },
    {
      role: "user",
    },
    {
      role: "bot",
    },
  ];

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
            <div className="bg-surface dark:bg-dm-surface w-[35px] h-[35px] rounded-full select-none animate-pulse"></div>
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
                ? "bg-surface dark:bg-dm-surface"
                : "bg-primary"
            } `}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
