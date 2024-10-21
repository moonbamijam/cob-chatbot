import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Anchor from "@components/pages/city-hall/layouts/header/Anchor";
import Dropdown from "@components/pages/city-hall/layouts/header/Dropdown";

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
    <header className="w-full bg-[#1a94d5] text-white text-sm">
      <nav className="w-full flex items-center gap-[30px] pl-8">
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
    </header>
  );
};

export default Header;
