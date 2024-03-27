// Components
import Section from "./common/Section";
import Header from "./header/Header";
import TimeHeader from "./ui/TimeHeader";
import Logo from "./ui/Logo";
import ArticleLeft from "./articles/ArticleLeft";
import ArticleRight from "./articles/ArticleRight";

// Assets
import LandingImg from "../assets/landing.png";

// Icons
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Footer from "./footer/Footer";

const Page = () => {
  return (
    <>
      <span
        id="time-header-bg"
        className="w-full h-6 bg-opaqueBlack absolute -z-10"
      ></span>
      <Section>
        <TimeHeader />
        <Logo />
      </Section>
      <Section className={"bg-white"}>
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
      <Section className={"bg-footerOpaqueBlack"}>
        <Footer />
      </Section>
    </>
  );
};

export default Page;
