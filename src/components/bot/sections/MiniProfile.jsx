import { chatbot } from "../../../libs/bot-details";

const MiniProfile = ({ state }) => {
  return (
    <section id="bot-profile" className="flex flex-col items-center mb-8">
      <img
        src={chatbot.logo}
        alt=""
        width={100}
        height={100}
        className="rounded-full mb-2"
      />
      <div id="details" className="text-center mb-4">
        <h1 className="font-bold text-4xl mb-1 dark:text-white">
          {chatbot.name}
        </h1>
        <h3 className="dark:text-white mb-3">{chatbot.slogan}</h3>
        {state && (
          <p className="dark:text-white text-sm opacity-70">{chatbot.desc}</p>
        )}
      </div>
      <hr className="w-full" />
    </section>
  );
};

export default MiniProfile;
