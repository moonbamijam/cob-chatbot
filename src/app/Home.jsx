import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { chatbotConfig } from "../lib/bot/chatbotConfig";

// components
import { Button } from "../components/ui/Button";
import ScreenDim from "../components/bot/ui/ScreenDim";
import ImageCredits from "../components/bot/ui/ImageCredits";
import Grid from "../components/common/Grid";

// assets
import Bacoor from "../../static/assets/images/bacoor.jpg";
import Cityhall from "../../static/assets/images/city-hall.jpg";

import PageCard from "../components/cards/PageCard";
import Header from "../components/header/Header";

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
      <main className="container w-full h-screen flex flex-col-reverse lg:flex-row justify-center lg:justify-between xl:justify-around lg:items-center px-[8vw] gap-6 xl:gap-16 2xl:px-52 ">
        <section className="max-w-[400px]">
          <div className="">
            <h1 className="w-max font-helvetica text-6xl md:text-7xl lg:text-8xl xl:text-9xl bg-gradient-to-tr from-primary from-35% via-tertiary via-70% to-secondary bg-clip-text text-transparent">
              {chatbotConfig.name}
            </h1>
            <p className="text-2xl lg:text-3xl 2xl:text-4xl dark:text-white">
              {chatbotConfig.slogan}
            </p>
          </div>
          <p className="text-xl text-black/50 dark:text-white/50 mt-6">
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
              src={Bacoor}
              alt="City Hall"
              width={500}
              height={350}
              className="2xl:w-[500px] 2xl:h-[350px] max-w-[500px max-h-[350px] rounded-2xl object-cover"
            />
            <ImageCredits
              link="https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40silayushi%2Fbacoor-city-a-journey-through-history-progress-and-community-4a06c6cda9c1&psig=AOvVaw2dXhahggF8q0w2UCgERnl0&ust=1726067665394000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDG76LVuIgDFQAAAAAdAAAAABAn"
              displayedText="source"
              className="bottom-0 py-2 px-4 text-white opacity-0 hover:underline group-hover:opacity-100"
            />
          </div>
        </div>
      </main>
      <section
        ref={modalRef}
        className={`${isModalActive ? "animate-open-modal opacity-100 visible" : "opacity-0 invisible"} fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[1200px] h-[800px] bg-surface dark:bg-dm-surface z-40 py-20 px-16 rounded-xl`}
      >
        <div className="flex justify-between items-center">
          <div className="text-4xl w-max dark:text-white">
            <h1>Hello Bacooreños!</h1>
            <h2 className="opacity-70">You can ask me about,</h2>
          </div>
          <Button
            onClick={toggleModal}
            variant="destructiveOutline"
            size="lg"
            className="hover:text-white"
          >
            back
          </Button>
        </div>
        <Grid className="grid-cols-3 gap-8 mt-16">
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
