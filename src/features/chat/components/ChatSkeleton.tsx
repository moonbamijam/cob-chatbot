import SkeletonScreen from "@components/ui/SkeletonScreen";
import ItemsRenderer from "@layouts/ItemsRenderer";

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
    <section>
      <ItemsRenderer
        items={skeletonizedChat}
        renderItems={(skeletonizedChat, i) => (
          <div
            key={i}
            className={`${
              skeletonizedChat.role === "bot"
                ? "bot-chat flex items-center gap-2"
                : "user-chat flex justify-end ml-auto"
            } mt-3 mb-2`}
          >
            {skeletonizedChat.role === "bot" && (
              <SkeletonScreen
                variant="icon"
                className="bg-surface dark:bg-dm-surface w-[35px] h-[35px] rounded-full select-none"
              />
            )}
            <SkeletonScreen
              id="chat"
              variant="chat"
              className={`${
                skeletonizedChat.role === "bot"
                  ? "bg-surface dark:bg-dm-surface w-full h-[96px]"
                  : "bg-primary w-[300px] h-[68px]"
              } `}
            />
          </div>
        )}
      />
    </section>
  );
};

export default ChatSkeleton;
