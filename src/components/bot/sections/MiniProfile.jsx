import { Link } from "react-router-dom";
import { useContext } from "react";
import { chatbotConfig } from "../../../lib/bot/chatbotConfig";

// context
import { ChatbotContext } from "../../../contexts/ChatbotContext";

// components
import { Image } from "../../ui/Image";
import { Button } from "../../ui/Button";
import DevIcon from "../icons/DevIcon";

const MiniProfile = ({ state, className, miniProfileRef }) => {
  const { chatbot } = useContext(ChatbotContext);
  const [configuration] = chatbot.configuration;

  return (
    <section
      id="bot-profile"
      className={`flex flex-col items-center pt-10 ${className}`}
      ref={miniProfileRef}
    >
      <Image
        src={configuration.icon}
        alt="Chatbot Icon"
        variant="icon"
        size="lg"
        className="mb-2"
      />
      <div
        id="details"
        className="w-full flex flex-col items-center text-center mb-4 p-2"
      >
        <h1 className="max-w-full font-bold text-2xl sm:text-4xl mb-1 dark:text-white capitalize line-clamp-5">
          {configuration.name}
        </h1>
        <h3 className="max-w-full dark:text-white sm:text-lg mb-10 line-clamp-5">
          {configuration.slogan}
        </h3>
        {state && (
          <div className="space-y-8">
            <p className="max-w-[600px] text-left text-black/80 dark:text-white/80 text-sm whitespace-pre-line">
              {chatbotConfig.about}
            </p>
            <section className="flex flex-col items-center gap-8 text-black/90 dark:text-white/90">
              <h2 className="font-semibold text-xl">Meet my creators!</h2>
              <div className="inline-grid grid-cols-2 gap-4">
                <DevIcon
                  to="https://moonbamiofficial.vercel.app/"
                  src="https://github.com/moonbamijam.png"
                  alt="Jam Moonbami"
                  text="moonbami"
                />
                <DevIcon
                  to="https://www.facebook.com/JirehTumbagahan"
                  src="https://github.com/Jireh-sama.png"
                  alt="Jireh"
                  text="ecchiko"
                />
              </div>
            </section>
          </div>
        )}
      </div>
      {state && (
        <Link to="/" className="my-8">
          <Button
            variant="cta"
            size="xl"
            className="text-sm border border-surface dark:border-dm-surface bg-surface dark:bg-dm-surface hover:bg-primary dark:hover:bg-primary dark:text-white hover:text-white"
          >
            back to homepage
          </Button>
        </Link>
      )}
      <hr className="w-full border-surface-dark dark:border-dm-surface-light" />
    </section>
  );
};

export default MiniProfile;
