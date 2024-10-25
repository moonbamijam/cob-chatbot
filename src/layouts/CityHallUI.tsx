// Components
import Section from "@/components/pages/city-hall/layouts/Section";
import Header from "@/components/pages/city-hall/layouts/header/Header";
import TimeHeader from "@/components/pages/city-hall/ui/TimeHeader";
import Logo from "@/components/pages/city-hall/ui/Logo";
import ArticleLeft from "@/components/pages/city-hall/articles/ArticleLeft";
import ArticleRight from "@/components/pages/city-hall/articles/ArticleRight";
import Footer from "@/components/pages/city-hall/layouts/footer/Footer";

// Assets
import LandingImg from "@/static/assets/images/landing.png";

// Icons
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const CityHall = () => {
  return (
    <div className="city-hall-page-body">
      <span
        id="time-header-bg"
        className="hidden xl:block w-full h-6 bg-black/40 absolute"
      ></span>
      <Section className="hidden xl:flex">
        <TimeHeader />
        <Logo />
      </Section>
      <Section className="container hidden xl:flex bg-white">
        <Header />
        <div id="latest-news" className="flex px-6 py-3">
          <div className="bg-black px-3 uppercase text-[#ff0202] font-bold text-sm rounded mr-5">
            latest news
          </div>
          <div className="w-[730px] text-[#ff0202] font-bold text-sm truncate">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            omnis voluptatum. Deserunt modi cumque accusamus at incidunt vel.
            Praesentium beatae non deleniti tempora eos dolorem labore dolore
            quibusdam amet vero.
          </div>
          <div id="latest-news-navigation" className="flex gap-2 ml-auto">
            <button className="text-[#ff0202] rounded-sm border border-red-300">
              <RiArrowLeftSLine />
            </button>
            <button className="text-[#ff0202] rounded-sm border border-red-300">
              <RiArrowRightSLine />
            </button>
          </div>
        </div>
        <a
          href="https://bacoor.gov.ph/featured/congratulations-city-government-of-bacoor/"
          id="landing-image"
          className="mx-auto mb-4"
        >
          <img src={LandingImg} alt="" />
        </a>
        <div id="article-list" className="flex mx-auto">
          <ArticleLeft />
          <ArticleRight />
        </div>
      </Section>
      <Section className="hidden xl:flex bg-black/70">
        <Footer />
      </Section>
    </div>
  );
};

export default CityHall;
