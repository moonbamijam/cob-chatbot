import { useContext } from "react";
import { chatbotConfig } from "@constants/bot/chatbot-config";

// contexts
import { AuthContext } from "@contexts/AuthContext";
import { ChatbotContext } from "@contexts/ChatbotContext";

// layouts
import Header from "@layouts/header/Header";

// components
import Button from "@components/ui/Button";
import Version from "@components/Version";
import GradientBotName from "@components/GradientBotName";
import GradientLoadingSpinner from "@components/GradientLoadingSpinner";

// constants
import { baseUrl } from "@constants/url/base-url";

const Home = () => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;
  const auth = useContext(AuthContext);
  const { setIsSignedIn } = auth.user;

  return (
    <>
      {configuration.name ? (
        <>
          <Header />
          <main className="container relative w-full lg:h-screen flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between 2xl:justify-around lg:items-center py-[100px] px-[2vw] lg:px-[4vw] 2xl:px-[6vw] gap-6">
            <section className="text-center lg:text-left">
              <div className="max-w-[500px]">
                <GradientBotName className="font-helvetica text-6xl md:text-7xl lg:text-8xl">
                  {configuration.name}
                </GradientBotName>
                <p className="text-2xl lg:text-3xl 2xl:text-4xl ml-2 dark:text-white max-w-[400px]">
                  {configuration.slogan}
                </p>
              </div>
              <p className="text-xl text-black/50 dark:text-white/50 ml-2 mt-6 max-w-[350px]">
                {chatbotConfig.introduction}
              </p>
              <a href={`${baseUrl}/bacoor-gov`}>
                <Button
                  variant="cta"
                  className="mt-8 ml-2 bg-primary hover:bg-primary-dark lg:text-lg 2xl:text-xl text-white"
                  onClick={() => setIsSignedIn(true)}
                >
                  ask {configuration.name}
                </Button>
              </a>
            </section>
            <div className="relative rounded-2xl overflow-hidden select-none">
              <img
                src={configuration.icon}
                alt="Chatbot"
                className="w-max h-max max-h-[450px] lg:max-h-[600px] xl:max-h-[650px] [@media_(min-height:0px)]:max-h-[500px] [@media_(min-height:750px)]:max-h-[650px] rounded-2xl object-contain"
              />
            </div>
            <Version
              text="v"
              className="fixed left-[2%] bottom-[2.5%] text-sm text-black/30 dark:text-white/30"
            />
          </main>
        </>
      ) : (
        <GradientLoadingSpinner />
      )}
    </>
  );
};

export default Home;
