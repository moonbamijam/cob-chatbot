import { LegacyRef, useContext } from "react";

// context
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import Image from "@components/ui/Image";

type BotMiniProfileProps = Partial<
  Readonly<{
    className: string;
    miniProfileRef: LegacyRef<HTMLElement>;
  }>
>;

const BotMiniProfile = ({ className, miniProfileRef }: BotMiniProfileProps) => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;

  return (
    <section
      id="bot-mini-profile"
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
        <div className="mb-4 space-y-2">
          <h1 className="max-w-full font-bold text-2xl sm:text-4xl  dark:text-white capitalize line-clamp-5">
            {configuration.name}
          </h1>
          <h3 className="max-w-full dark:text-white sm:text-lg  line-clamp-5">
            {configuration.slogan}
          </h3>
        </div>
      </div>
      <hr className="w-full border-surface-dark dark:border-dm-surface-light" />
    </section>
  );
};

export default BotMiniProfile;
