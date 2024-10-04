import { chatbotConfig } from "../lib/bot/chatbotConfig";

// components
import { Button } from "../components/ui/Button";
import Header from "../components/header/Header";

// assets
import LandingCoverLight from "../../static/assets/gif/landing-convo-light.gif";
import LandingCoverDark from "../../static/assets/gif/landing-convo-dark.gif";

// icons
import Version from "../components/bot/ui/Version";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <main className="container relative w-full lg:h-screen flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between 2xl:justify-around lg:items-center py-[100px] px-[2vw] lg:px-[4vw] 2xl:px-[6vw] gap-6">
        <section className="text-center lg:text-left">
          <div className="max-w-[400px]">
            <h1 className="font-helvetica text-6xl md:text-7xl lg:text-8xl bg-gradient-to-tr from-primary from-35% via-tertiary via-70% to-secondary bg-clip-text text-transparent cursor-default select-none">
              {chatbotConfig.name}
            </h1>
            <p className="text-2xl lg:text-3xl 2xl:text-4xl ml-2 dark:text-white max-w-[350px]">
              {chatbotConfig.slogan}
            </p>
          </div>
          <p className="text-xl text-black/50 dark:text-white/50 ml-2 mt-6 max-w-[350px]">
            {chatbotConfig.introduction}
          </p>
          <Link to="/bacoor-gov">
            <Button
              variant="cta"
              size="xl"
              className="mt-8 ml-2 bg-primary hover:bg-primary-dark lg:text-lg 2xl:text-xl text-white"
            >
              ask {chatbotConfig.name}
            </Button>
          </Link>
        </section>
        <div className="pb-2 lg:border border-surface dark:border-dm-surface rounded-2xl overflow-hidden select-none">
          <img
            src={LandingCoverLight}
            alt="Chatbot"
            width={400}
            height={600}
            className="block dark:hidden w-[400px] h-[600px] lg:w-[500px] lg:h-[700px] rounded-2xl object-contain"
          />
          <img
            src={LandingCoverDark}
            alt="Chatbot"
            width={400}
            height={600}
            className="hidden dark:block w-[400px] h-[600px] lg:w-[500px] lg:h-[700px] rounded-2xl object-contain"
          />
        </div>
        <Version
          text="v"
          className="fixed left-[2%] bottom-[2.5%] text-sm text-black/50 dark:text-white/50"
        />
      </main>
    </>
  );
};

export default Home;
