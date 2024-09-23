import { Link } from "react-router-dom";
import { useContext } from "react";
import { ChatbotContext } from "../../../contexts/ChatbotContext";

const MiniProfile = ({ state, className, miniProfileRef }) => {
  const { chatbot } = useContext(ChatbotContext);
  const [configuration] = chatbot.configuration;

  return (
    <section
      id="bot-profile"
      className={`flex flex-col items-center ${className}`}
      ref={miniProfileRef}
    >
      <img
        src={configuration.icon}
        alt="Chatbot Icon"
        width={100}
        height={100}
        className="rounded-full mb-2 aspect-square object-cover select-none"
      />
      <div
        id="details"
        className="w-full flex flex-col items-center text-center mb-4 p-2"
      >
        <h1 className="max-w-full font-bold text-2xl sm:text-4xl mb-1 dark:text-white capitalize line-clamp-5">
          {configuration.name}
        </h1>
        <h3 className="max-w-full dark:text-white sm:text-lg mb-6 line-clamp-5">
          {configuration.slogan}
        </h3>
        {state && (
          <p className="dark:text-white text-sm opacity-70 whitespace-pre-line"></p>
        )}
      </div>
      {state && (
        <Link
          to="/"
          className="hover:underline text-primary dark:text-primary-light capitalize mb-8"
        >
          back to homepage
        </Link>
      )}
      <hr className="w-full" />
    </section>
  );
};

export default MiniProfile;
