import { useContext } from "react";
import { chatbotConfig } from "@constants/bot/chatbot-config";

// contexts
import { AuthContext } from "@contexts/AuthContext";

// layouts
import Header from "@layouts/header/Header";

// components
import Button from "@components/ui/Button";
import Version from "@components/Version";
import GradientBotName from "@components/GradientBotName";

// constants
import { baseUrl } from "@constants/url/base-url";

// assets
import LandingCoverLight from "@static/assets/gif/landing-convo-light.gif";
import LandingCoverDark from "@static/assets/gif/landing-convo-dark.gif";

const Home = () => {
  const auth = useContext(AuthContext);
  const { setIsSignedIn } = auth.user;

  return (
    <>
      <Header />
      <main className="container relative w-full lg:h-screen flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between 2xl:justify-around lg:items-center py-[100px] px-[2vw] lg:px-[4vw] 2xl:px-[6vw] gap-6">
        <section className="text-center lg:text-left">
          <div className="max-w-[400px]">
            <GradientBotName className="font-helvetica text-6xl md:text-7xl lg:text-8xl">
              {chatbotConfig.name}
            </GradientBotName>
            <p className="text-2xl lg:text-3xl 2xl:text-4xl ml-2 dark:text-white max-w-[350px]">
              {chatbotConfig.slogan}
            </p>
          </div>
          <p className="text-xl text-black/50 dark:text-white/50 ml-2 mt-6 max-w-[350px]">
            {chatbotConfig.introduction}
          </p>
          <a href={`${baseUrl}/bacoor-gov`}>
            <Button
              variant="cta"
              size="xl"
              className="mt-8 ml-2 bg-primary hover:bg-primary-dark lg:text-lg 2xl:text-xl text-white"
              onClick={() => setIsSignedIn(true)}
            >
              ask {chatbotConfig.name}
            </Button>
          </a>
        </section>
        <div className="relative rounded-2xl overflow-hidden select-none">
          <img
            src={LandingCoverLight}
            alt="Chatbot"
            className="block dark:hidden w-max h-max max-h-[500px] lg:max-h-[650px] xl:max-h-[700px] [@media_(min-height:0px)]:max-h-[550px] [@media_(min-height:800px)]:max-h-[700px] rounded-2xl object-contain"
          />
          <img
            src={LandingCoverDark}
            alt="Chatbot"
            className="hidden dark:block w-max h-max max-h-[500px] lg:max-h-[650px] xl:max-h-[700px] [@media_(min-height:0px)]:max-h-[550px] [@media_(min-height:800px)]:max-h-[700px] rounded-2xl object-contain"
          />
        </div>
        <Version
          text="v"
          className="fixed left-[2%] bottom-[2.5%] text-sm text-black/30 dark:text-white/30"
        />
      </main>
    </>
  );
};

export default Home;
