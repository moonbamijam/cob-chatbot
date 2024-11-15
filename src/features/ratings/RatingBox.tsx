import { useContext, useEffect, useState } from "react";

// context
import { ChatbotContext } from "@contexts/ChatbotContext";
import { UserContext } from "@contexts/UserContext";
import { ChatContext } from "@contexts/ChatContext";

// features
import Rating from "@features/ratings/Rating";
import Button from "@components/ui/Button";

// icons
import { IoClose } from "react-icons/io5";

type RatingBoxProps = Partial<Readonly<{ className: string }>>;

const RatingBox = ({ className }: RatingBoxProps) => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;
  const { conversation } = chatbot.conversation;
  const user = useContext(UserContext);
  const { rating } = user.rating;
  const chat = useContext(ChatContext);
  const ratingBoxRef = chat.ratingBoxRef;
  const [closeRatingBox, setCloseRatingBox] = useState<string>(
    "opacity-0 invisible",
  );
  const [isRatingBoxClosed, setIsRatingBoxClosed] = useState<boolean>(true);

  const handleRatingBox = () => {
    if (rating === 0) {
      setTimeout(() => setCloseRatingBox(""), 1000);
    } else if (rating != 0) {
      setTimeout(
        () => setCloseRatingBox("opacity-0 invisible translate-y-full"),
        5000,
      );
    }
  };

  useEffect(() => {
    if (conversation.length >= 15) handleRatingBox();
  }, [conversation.length, rating]);

  return (
    <>
      {isRatingBoxClosed && (
        <div
          ref={ratingBoxRef}
          className={`fixed top-[10%] mx-auto inset-x-0 xl:mx-0 xl:top-auto xl:bottom-[2%] xl:left-[2%] w-max h-max dark:text-white/80 bg-surface dark:bg-dm-background border border-surface-dark dark:border-dm-surface-light p-8 rounded-xl z-[100] xl:z-50 ${className} ${closeRatingBox}`}
        >
          <div className="space-y-4">
            <div className="flex gap-8 sm:text-lg xl:text-xl max-w-[300px] sm:max-w-[350px] xl:max-w-[400px]">
              <h2>
                {rating
                  ? "Thanks for the feedback!"
                  : `Enjoying talking to ${configuration.name} so far? Please give us a
            rating!`}
              </h2>
              <Button
                onClick={() => setIsRatingBoxClosed(false)}
                variant="icon"
                size="icon"
                className="ml-auto border text-error border-error dark:border-dm-surface bg-surface dark:bg-dm-surface dark:hover:bg-error hover:bg-error [&>svg>path]:hover:text-white"
              >
                <IoClose />
              </Button>
            </div>
            <Rating />
          </div>
        </div>
      )}
    </>
  );
};

export default RatingBox;
