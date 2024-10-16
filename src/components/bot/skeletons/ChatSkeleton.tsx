import ItemsRenderer from "../../common/ItemsRenderer";
import SkeletonScreen from "../../ui/SkeletonScreen";

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
    <section id="messages">
      <ItemsRenderer
        items={skeletonizedChat}
        renderItems={(skeletonizedChat, i) => (
          <SkeletonScreen
            key={i}
            variant="chat"
            className={`${
              skeletonizedChat.role == "bot"
                ? "bot chat flex items-center gap-2"
                : "user chat flex justify-end ml-auto"
            } mt-3 mb-2`}
          >
            {skeletonizedChat.role == "bot" && (
              <SkeletonScreen
                variant="icon"
                className="bg-surface dark:bg-dm-surface w-[35px] h-[35px] rounded-full select-none"
              />
            )}
            <SkeletonScreen
              id="chat"
              variant="chat"
              className={`${
                skeletonizedChat.role == "bot"
                  ? "bg-surface dark:bg-dm-surface w-full h-[96px]"
                  : "bg-primary w-[216px] h-[64px]"
              } `}
            />
          </SkeletonScreen>
        )}
      />
    </section>
  );
};

export default ChatSkeleton;
