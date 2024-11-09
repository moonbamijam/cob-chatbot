import { useState } from "react";

// Components
import Section from "@components/pages/city-hall/layouts/Section";
import Header from "@components/pages/city-hall/layouts/header/Header";
import TimeHeader from "@components/pages/city-hall/ui/TimeHeader";
import Logo from "@components/pages/city-hall/ui/Logo";
import ArticleLeft from "@components/pages/city-hall/articles/ArticleLeft";
import ArticleRight from "@components/pages/city-hall/articles/ArticleRight";
import Footer from "@components/pages/city-hall/layouts/footer/Footer";
import Button from "@components/ui/Button";

// Assets
import LandingImg from "@static/assets/images/landing.png";

// Icons
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import { FaTwitter } from "react-icons/fa6";
import { FaVimeoV } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const CityHall = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isDropdownOneActive, setIsDropdownOneActive] = useState(false);
  const [isDropdownTwoActive, setIsDropdownTwoActive] = useState(false);
  const [isDropdownThreeActive, setIsDropdownThreeActive] = useState(false);
  const [isDropdownFourActive, setIsDropdownFourActive] = useState(false);
  const [isDropdownFiveActive, setIsDropdownFiveActive] = useState(false);

  const toggleDropdownOne = () => {
    setIsDropdownOneActive(!isDropdownOneActive);
  };
  const toggleDropdownTwo = () => {
    setIsDropdownTwoActive(!isDropdownTwoActive);
  };
  const toggleDropdownThree = () => {
    setIsDropdownThreeActive(!isDropdownThreeActive);
  };
  const toggleDropdownFour = () => {
    setIsDropdownFourActive(!isDropdownFourActive);
  };
  const toggleDropdownFive = () => {
    setIsDropdownFiveActive(!isDropdownFiveActive);
  };

  return (
    <>
      <div className="city-hall-page-body">
        <span
          id="time-header-bg"
          className="w-full h-6 bg-black/40 absolute hidden md:block"
        ></span>
        <Section className="hidden md:flex">
          <TimeHeader />
          <Logo />
        </Section>
        <Section className=" flex bg-white">
          <Header
            isMenuActive={isMenuActive}
            setIsMenuActive={setIsMenuActive}
            isSearchActive={isSearchActive}
            setIsSearchActive={setIsSearchActive}
          />
          <div
            id="latest-news"
            className="flex flex-col items-center md:flex-row px-6 py-3 gap-3"
          >
            <div className="w-max bg-black px-3 uppercase text-[#ff0202] font-bold text-sm rounded mr-5">
              latest news
            </div>
            <div className="max-w-[730px] w-full text-[#ff0202] font-bold text-sm truncate">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              omnis voluptatum. Deserunt modi cumque accusamus at incidunt vel.
              Praesentium beatae non deleniti tempora eos dolorem labore dolore
              quibusdam amet vero.
            </div>
            <div
              id="latest-news-navigation"
              className="gap-2 ml-auto hidden md:flex"
            >
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
            className="mx-auto mb-4 p-2"
          >
            <img src={LandingImg} alt="" />
          </a>
          <div id="article-list" className="flex flex-col md:flex-row mx-auto">
            <ArticleLeft />
            <ArticleRight />
          </div>
        </Section>
        <Section className="flex bg-black/70">
          <Footer />
        </Section>
      </div>
      <menu
        className={`fixed md:hidden top-0 ${isMenuActive ? "" : "-translate-x-full invisible"} w-screen h-screen bg-[#353535] text-white z-20`}
      >
        <header className="flex items-center justify-between pl-5 pr-10 pt-4">
          <div className="flex items-center gap-1 h-[60px]">
            <Link
              to=""
              className="bg-transparent dark:bg-transparent border-none text-sm w-[40px] h-[40px] flex items-center justify-center hover:text-[#ff0202]"
            >
              <FaFacebookF />
            </Link>
            <Link
              to=""
              className="bg-transparent dark:bg-transparent border-none text-sm w-[40px] h-[40px] flex items-center justify-center hover:text-[#ff0202]"
            >
              <ImInstagram />
            </Link>
            <Link
              to=""
              className="bg-transparent dark:bg-transparent border-none text-sm w-[40px] h-[40px] flex items-center justify-center hover:text-[#ff0202]"
            >
              <FaTwitter />
            </Link>
            <Link
              to=""
              className="bg-transparent dark:bg-transparent border-none text-sm w-[40px] h-[40px] flex items-center justify-center hover:text-[#ff0202]"
            >
              <FaVimeoV />
            </Link>
            <Link
              to=""
              className="bg-transparent dark:bg-transparent border-none text-sm w-[40px] h-[40px] flex items-center justify-center hover:text-[#ff0202]"
            >
              <FaYoutube />
            </Link>
          </div>
          <Button
            onClick={() => setIsMenuActive(!isMenuActive)}
            className="bg-transparent dark:bg-transparent border-none text-4xl hover:text-[#ff0202]"
          >
            <IoMdClose />
          </Button>
        </header>
        <nav
          className="flex flex-col py-5 pl-8 pr-10"
          style={{ fontFamily: "Raleway" }}
        >
          <Link
            to=""
            className="capitalize text-[#ff0202] text-xl font-bold py-2"
          >
            home
          </Link>
          <NavLink
            text="about bacoor"
            state={isDropdownOneActive}
            toggle={toggleDropdownOne}
          >
            <DropdownNavLink
              url="https://bacoor.gov.ph/uncategorized/vision-mission/"
              text="mission & vision"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/historical-background-of-bacoor/"
              text="historical background of bacoor"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/videos/352nd-bakood-festival/"
              text="352nd bacoor festival"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/ang-himno-ng-bacoor/"
              text="ang himno ng bacoor"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/category/tourism/"
              text="tourism"
            />
          </NavLink>
          <NavLink
            text="city government"
            state={isDropdownTwoActive}
            toggle={toggleDropdownTwo}
          >
            <DropdownNavLink
              url="https://bacoor.gov.ph/category/tourism/"
              text="tourism"
            />
            <DropdownNavLink url="#" text="citizen charter" />
            <DropdownNavLink
              url="https://bacoor.gov.ph/city-officials/"
              text="city officials"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/city-and-units-heads/"
              text="city department and unit heads"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/barangay-officials-2023/"
              text="barangay officials"
            />
            <DropdownNavLink
              url="http://bacoorcitysp.com/legislative-tracker/"
              text="city ordinances"
            />
            <DropdownNavLink url="#" text="DILG Full Disclosure Policy" />
            <DropdownNavLink
              url="https://bacoor.gov.ph/clup-2015-2024/"
              text="CLUP (2015-2024)"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/job-vacancies/"
              text="job vacancies"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/privacy-policy/"
              text="privacy policy"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/iso-quality-management-system/"
              text="ISO (Quality Management System)"
            />
          </NavLink>
          <Link
            to="https://bacoor.gov.ph/mayor-strike-b-revilla-feed/"
            className="w-full flex items-center justify-between capitalize text-xl font-bold py-2"
          >
            mayor's corner
            <IoIosArrowForward />
          </Link>
          <NavLink
            text="gallery"
            state={isDropdownThreeActive}
            toggle={toggleDropdownThree}
          >
            <DropdownNavLink
              url="https://bacoor.gov.ph/category/gallery/"
              text="gallery"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/category/photobooth/"
              text="photobooth"
            />
          </NavLink>
          <NavLink
            text="services"
            state={isDropdownFourActive}
            toggle={toggleDropdownFour}
          >
            <DropdownNavLink
              url="https://boss.bacoor.gov.ph/"
              text="Online Application for Business & Building Permits"
            />
            <DropdownNavLink
              url="https://boss.bacoor.gov.ph/"
              text={
                "Online Appointment for Real Property Tax, Business & Building Permits"
              }
            />
            <DropdownNavLink
              url="https://boss.bacoor.gov.ph/"
              text="Solidarity Route Online Registration System"
            />
            <DropdownNavLink
              url="http://bacoorcitysp.com/legislative-tracker/"
              text="city ordinances"
            />
          </NavLink>
          <NavLink
            text="directory"
            state={isDropdownFiveActive}
            toggle={toggleDropdownFive}
          >
            <DropdownNavLink url="" text="test" />
            <DropdownNavLink
              url="https://bacoor.gov.ph/bacoor-hospital-directory/"
              text="hospital directory"
            />
            <DropdownNavLink
              url={
                "https://bacoor.gov.ph/local-directory-of-bacoor-government-center/"
              }
              text="Local Gov't Offices"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/city-and-units-heads/"
              text="City Department and Unit Heads"
            />
            <DropdownNavLink
              url="https://bacoor.gov.ph/barangay-hall-directory/"
              text="barangay hall"
            />
            <DropdownNavLink
              url={"https://bacoor.gov.ph/national-government-agenciesoffices/"}
              text="National Government Agencies/Offices"
            />
          </NavLink>
        </nav>
      </menu>
      <div
        className={`fixed md:hidden top-0 ${isSearchActive ? "" : "translate-x-full invisible"} w-screen h-screen bg-[#353535] text-white z-20`}
        style={{ fontFamily: "Raleway" }}
      >
        <header className="flex items-center justify-between pl-5 pr-10 pt-4">
          <Button
            onClick={() => setIsSearchActive(!isSearchActive)}
            className="bg-transparent dark:bg-transparent border-none text-4xl hover:text-[#ff0202] ml-auto"
          >
            <IoMdClose />
          </Button>
        </header>
        <label
          htmlFor="search"
          className="flex flex-col gap-4 max-w-[90%] px-5 mx-auto focus-within:border-none"
        >
          <p className="capitalize text-center text-xs text-gray-300">search</p>
          <input
            type="search"
            name="search"
            id="search"
            className="bg-transparent border-b-[1px] text-center text-3xl font-bold py-2 focus:outline-none"
          />
        </label>
      </div>
    </>
  );
};

type NavLinkProps = {
  text: string;
  toggle: () => void;
  state: boolean;
  children?: React.ReactNode;
};

const NavLink = ({ text, children, toggle, state }: NavLinkProps) => {
  return (
    <Button
      className="flex flex-col w-full capitalize text-xl font-bold bg-transparent dark:bg-transparent border-none"
      onClick={toggle}
    >
      <div className="flex items-center justify-between w-full py-3">
        {text}
        <IoIosArrowForward className={`${state && "rotate-90"}`} />
      </div>
      <div
        className={`${state ? "h-max" : "h-0 opacity-0 invisible"} flex flex-col px-6 text-base font-normal text-gray-300 text-left`}
      >
        {children}
      </div>
    </Button>
  );
};

type DropdownNavLinkProps = {
  text: string;
  url: string;
};

const DropdownNavLink = ({ text, url }: DropdownNavLinkProps) => {
  return (
    <Link to={url} className="py-2">
      {text}
    </Link>
  );
};

export default CityHall;
