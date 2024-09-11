import { useState, useEffect, useRef } from "react";
import { chatbotConfig } from "../lib/bot/chatbotConfig";

// components
import { Button } from "../components/ui/Button";
import ScreenDim from "../components/bot/ui/ScreenDim";
import Grid from "../components/common/Grid";
import PageCard from "../components/cards/PageCard";
import Header from "../components/header/Header";

// assets
import LandingCoverLight from "../../static/assets/gif/landing-convo-light.gif";
import LandingCoverDark from "../../static/assets/gif/landing-convo-dark.gif";
import Cityhall from "../../static/assets/images/city-hall.jpg";

// icons
import { CgClose } from "react-icons/cg";

const Home = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const modalRef = useRef();

  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  useEffect(() => {
    const handleModal = (event) => {
      if (!modalRef.current?.contains(event.target)) setIsModalActive(false);
    };
    document.addEventListener("mousedown", handleModal);
    return () => {
      document.removeEventListener("mousedown", handleModal);
    };
  }, [isModalActive]);

  return (
    <>
      <Header />
      <main className="container w-full h-screen flex flex-col-reverse lg:flex-row justify-center lg:justify-between 2xl:justify-around lg:items-center px-[2vw] lg:px-[4vw] 2xl:px-[8vw] gap-6">
        <section className="max-w-[400px]">
          <div className="">
            <h1 className="w-max font-helvetica text-6xl md:text-7xl lg:text-8xl xl:text-9xl bg-gradient-to-tr from-primary from-35% via-tertiary via-70% to-secondary bg-clip-text text-transparent">
              {chatbotConfig.name}
            </h1>
            <p className="text-2xl lg:text-3xl 2xl:text-4xl dark:text-white max-w-[350px]">
              {chatbotConfig.slogan}
            </p>
          </div>
          <p className="text-xl text-black/50 dark:text-white/50 mt-6 max-w-[350px]">
            {chatbotConfig.introduction}
          </p>
          <Button
            onClick={toggleModal}
            variant="cta"
            size="xl"
            className="mt-8 rounded-[64px] bg-primary hover:bg-primary-dark lg:text-lg 2xl:text-xl text-white capitalize"
          >
            ask {chatbotConfig.name}
          </Button>
        </section>
        <div>
          <div className="relative group">
            <img
              src={LandingCoverLight}
              alt="City Hall"
              width={550}
              height={800}
              className="dark:hidden lg:border border-surface p-2 lg:w-full max-h-[500px] lg:h-full lg:max-w-[550]px lg:max-h-[800px] rounded-2xl object-contain lg:object-cover"
            />
            <img
              src={LandingCoverDark}
              alt="City Hall"
              width={550}
              height={800}
              className="hidden lg:border dark:border-dm-surface p-2 dark:block lg:w-full max-h-[500px] lg:h-full lg:max-w-[550]px lg:max-h-[800px] rounded-2xl object-contain lg:object-cover"
            />
          </div>
        </div>
      </main>
      <section
        ref={modalRef}
        className={`${isModalActive ? "animate-open-modal opacity-100 visible" : "opacity-0 invisible"} fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90%] max-w-[1200px] h-full max-h-[800px] flex flex-col bg-surface dark:bg-dm-surface z-40 px-8 py-10 xl:py-20 xl:px-16 rounded-xl`}
      >
        <Button
          onClick={toggleModal}
          variant="icon"
          size="icon"
          className="sm:hidden border ml-auto text-black/50 border-error hover:bg-error [&>svg>path]:hover:text-white mb-6"
        >
          <CgClose />
        </Button>
        <div className="flex justify-between items-center">
          <div className="text-xl sm:text-2xl md:text-3xl xl:text-4xl w-max dark:text-white">
            <h1>Hello Bacooreños!</h1>
            <h2 className="opacity-70">You can ask me about,</h2>
          </div>
          <Button
            onClick={toggleModal}
            variant="destructiveOutline"
            size="lg"
            className={`hidden text-xl sm:block hover:text-white ${!isModalActive && "pointer-events-none"}`}
          >
            back
          </Button>
        </div>
        <Grid className="lg:grid-cols-3 sm:justify-center gap-8 mt-8 xs:mt-10 xl:mt-16">
          <PageCard name="Bacoor city hall" img={Cityhall} />
          <PageCard comingSoon />
        </Grid>
      </section>
      <ScreenDim
        className={`bg-black z-30 backdrop-blur ${
          isModalActive ? "opacity-80" : "opacity-0 invisible"
        }`}
      />
    </>
  );
};

export default Home;
