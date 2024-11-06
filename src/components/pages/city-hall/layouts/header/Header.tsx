import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Anchor from "@components/pages/city-hall/layouts/header/Anchor";
import Dropdown from "@components/pages/city-hall/layouts/header/Dropdown";
import { CgMenuGridR } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import CityHallLogo from "@static/assets/images/city-hall-logo.png";

const Header = () => {
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
    <header className=" bg-[#1a94d5] text-white text-sm z-10">
      <nav className="hidden md:flex w-full items-center gap-[30px] pl-8">
        <Anchor href={"https://bacoor.gov.ph/"} text={"home"} />
        <Dropdown
          text={"about bacoor"}
          dropdownOne={isDropdownOneActive}
          toggle={toggleDropdownOne}
        />
        <Dropdown
          text={"city government"}
          dropdownTwo={isDropdownTwoActive}
          toggle={toggleDropdownTwo}
        />
        <Dropdown
          // href={"https://bacoor.gov.ph/mayor-strike-b-revilla-feed/"}
          text={"mayor's corner"}
          dropdownThree={isDropdownThreeActive}
          toggle={toggleDropdownThree}
        />
        <Anchor
          href={"https://bacoor.gov.ph/category/gallery/"}
          text={"gallery"}
        />
        <Dropdown
          text={"services"}
          dropdownFour={isDropdownFourActive}
          toggle={toggleDropdownFour}
        />
        <Dropdown
          text={"directory"}
          dropdownFive={isDropdownFiveActive}
          toggle={toggleDropdownFive}
        />
        <button
          aria-label="Search Button"
          id="search"
          className="text-lg p-5 ml-auto"
        >
          <FaMagnifyingGlass />
        </button>
      </nav>
      <nav className="flex items-center justify-between md:hidden">
        <CgMenuGridR className="text-4xl text-[#ff0202] m-2" />
        <img src={CityHallLogo} alt="" className="max-w-[40px]" />
        <FaSearch className="text-2xl text-[#ff0202] m-2" />
      </nav>
    </header>
  );
};

export default Header;
