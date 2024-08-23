import { useContext } from "react";
import { ThemesContext } from "../../../../../contexts/ThemesProvider";
import { LuSun } from "react-icons/lu";
import { FaMoon } from "react-icons/fa6";
import SettingsMiniTitle from "../../SettingsMiniTitle";

const ThemeSwitch = () => {
  const [theme, setTheme] = useContext(ThemesContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="">
      <SettingsMiniTitle text="theme" />
      <div className="flex overflow-hidden">
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
                ? "bg-dm-surface shadow-dm-surface-dark border-transparent"
                : "bg-surface shadow-surface-dark"
            }`}
          >
            <div
              className={` w-[50px] h-[50px] absolute top-[50%] left-0 translate-y-[-50%] flex justify-center items-center shadow-inner rounded-full ${
                theme === "dark"
                  ? "left-full translate-x-[-110%] bg-dm-surface-light shadow-dm-surface-dark"
                  : "translate-x-[10%] bg-white shadow-surface-dark"
              }`}
            >
              <LuSun
                className={`absolute w-[30px] h-[30px] text-yellow-500 ${
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
    </div>
  );
};

const ThemeName = ({ text }) => {
  return (
    <p className={`capitalize dark:text-white rounded-3xl px-4 py-3`}>{text}</p>
  );
};
export default ThemeSwitch;
