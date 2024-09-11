import { Link } from "react-router-dom";
import { chatbotConfig } from "../../../lib/bot/chatbotConfig";

const MiniProfile = ({ state, className, miniProfileRef }) => {
  return (
    <section
      id="bot-profile"
      className={`flex flex-col items-center ${className}`}
      ref={miniProfileRef}
    >
      <img
        src={chatbotConfig.logo}
        alt=""
        width={100}
        height={100}
        className="rounded-full mb-2"
      />
      <div id="details" className="text-center mb-4">
        <h1 className="font-bold text-4xl mb-1 dark:text-white">
          {chatbotConfig.name}
        </h1>
        <h3 className="dark:text-white text-lg mb-6">{chatbotConfig.slogan}</h3>
        {state && (
          <p className="dark:text-white text-sm opacity-70 whitespace-pre-line">
            {chatbotConfig.desc}
          </p>
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
