import { useContext } from "react";
import { Link } from "react-router-dom";

// context
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import Button from "@components/ui/Button";
import Image from "@components/ui/Image";
import AverageRating from "@features/ratings/AverageRating";

// features
import Rating from "@features/ratings/Rating";

// constants
import { chatbotConfig } from "@constants/bot/chatbot-config";
import { UserContext } from "@contexts/UserContext";

type BotProfileProps = Partial<
  Readonly<{
    className: string;
  }>
>;

const BotProfile = ({ className }: BotProfileProps) => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;
  const user = useContext(UserContext);
  const { averageRating, rating } = user.rating;

  return (
    <section
      id="bot-profile"
      className={`flex flex-col items-center pt-10 ${className}`}
    >
      {averageRating != 0 && (
        <AverageRating size="five" numberSize="xxl" className="mb-4" />
      )}
      <Image
        src={configuration.icon}
        alt="Chatbot Icon"
        variant="icon"
        size="lg"
        className="mb-2"
      />
      <div
        id="details"
        className="w-full flex flex-col items-center text-center p-2"
      >
        <div className="mb-4 space-y-2">
          <h1 className="max-w-full font-bold text-2xl sm:text-4xl dark:text-white capitalize line-clamp-5">
            {configuration.name}
          </h1>
          <h3 className="max-w-full dark:text-white sm:text-lg line-clamp-5">
            {configuration.slogan}
          </h3>
        </div>
        <div className="space-y-8">
          <p className="max-w-[600px] text-left text-black/80 dark:text-white/80 text-sm whitespace-pre-line">
            {chatbotConfig.about}
          </p>
          <div className="flex flex-col items-center gap-2">
            <h2 className="max-w-[200px] md:max-w-[300px] lg:max-w-[400px]">
              {rating != 0
                ? `Your rating to ${configuration.name}`
                : `Enjoying talking to ${configuration.name} so far? Please give us a
            rating!`}
            </h2>
            <Rating />
          </div>
        </div>
      </div>
      <Link to="/" className="mb-8">
        <Button
          variant="cta"
          size="xl"
          className="text-sm border border-surface dark:border-dm-surface bg-surface dark:bg-dm-surface hover:bg-primary dark:hover:bg-primary dark:text-white hover:text-white"
        >
          back to homepage
        </Button>
      </Link>
      <hr className="w-full border-surface-dark dark:border-dm-surface-light" />
    </section>
  );
};

export default BotProfile;
