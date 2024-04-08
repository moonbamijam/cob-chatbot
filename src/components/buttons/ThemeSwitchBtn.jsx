import { LuSun } from "react-icons/lu";
import { FaMoon } from "react-icons/fa6";

const ThemeSwitchBtn = ({ state, onClick }) => {
  return (
    <>
      <input type="checkbox" name="toggle" id="toggle" className="hidden" />
      <button
        onClick={() => onClick()}
        className="display toggle-wrapper flex items-center justify-center gap-1 my-2 overflow-hidden"
      >
        <ThemeName text={"light"} />
        <label
          htmlFor="toggle"
          className={`relative border rounded-full w-[130px] h-[60px] shadow-inner cursor-pointer [&>div]:active:w-[55px] ${
            state === "dark"
              ? "bg-gray-500 shadow-gray-800 border-transparent"
              : "bg-gray-200 shadow-gray-300"
          }`}
        >
          <div
            className={` w-[50px] h-[50px] absolute top-[50%] left-0 translate-y-[-50%] flex justify-center items-center shadow-inner bg-white rounded-full ${
              state === "dark"
                ? "left-full translate-x-[-110%] bg-gray-700 shadow-gray-800"
                : "translate-x-[10%] "
            }`}
          >
            <LuSun
              className={`absolute w-[30px] h-[30px]  text-yellow-500 ${
                state === "dark" ? "mt-[150%] opacity-0" : "mt-0 opacity-100"
              } `}
            />
            <FaMoon
              className={`absolute w-[30px] h-[30px]  text-white ${
                state === "dark" ? "mt-0 opacity-100" : "mt-[-150%] opacity-0"
              } `}
            />
          </div>
        </label>
        <ThemeName text={"dark"} />
      </button>
    </>
  );
};

const ThemeName = ({ text }) => {
  return (
    <p
      className={`capitalize dark:text-white rounded-3xl  px-4 py-3 `}
    >
      {text}
    </p>
  );
};
export default ThemeSwitchBtn;
