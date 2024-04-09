import { useContext } from "react";
import { LuSun } from "react-icons/lu";
import { FaMoon } from "react-icons/fa6";

import { ThemesContext } from "../../../providers/ThemesProvider";

const ThemeSwitchBtn = () => {
  const [theme, setTheme] = useContext(ThemesContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-center my-2 overflow-hidden">
      <input type="checkbox" name="toggle" id="toggle" className="hidden" />
      <button
        onClick={() => toggleTheme()}
        className="display toggle-wrapper flex items-center justify-center gap-1"
      >
        <ThemeName text={"light"} />
        <label
          htmlFor="toggle"
          className={`relative border rounded-full w-[130px] h-[60px] shadow-inner cursor-pointer [&>div]:active:w-[55px] ${
            theme === "dark"
              ? "bg-gray-500 shadow-gray-800 border-transparent"
              : "bg-gray-300 shadow-gray-400"
          }`}
        >
          <div
            className={` w-[50px] h-[50px] absolute top-[50%] left-0 translate-y-[-50%] flex justify-center items-center shadow-inner rounded-full ${
              theme === "dark"
                ? "left-full translate-x-[-110%] bg-gray-700 shadow-gray-800"
                : "translate-x-[10%] bg-white shadow-gray-400"
            }`}
          >
            <LuSun
              className={`absolute w-[30px] h-[30px]  text-yellow-500 ${
                theme === "dark" ? "mt-[150%] opacity-0" : "mt-0 opacity-100"
              } `}
            />
            <FaMoon
              className={`absolute w-[30px] h-[30px] text-white ${
                theme === "dark" ? "mt-0 opacity-100" : "mt-[-150%] opacity-0"
              } `}
            />
          </div>
        </label>
        <ThemeName text={"dark"} />
      </button>
    </div>
  );
};

const ThemeName = ({ text }) => {
  return (
    <p className={`capitalize dark:text-white rounded-3xl px-4 py-3`}>{text}</p>
  );
};
export default ThemeSwitchBtn;
