import { useContext } from "react";
import { chatbotConfig } from "../../lib/bot/chatbotConfig";
import { Link } from "react-router-dom";

// context
import { ThemesContext } from "../../contexts/ThemesProvider";

// icons
import { LuSun, LuMoon } from "react-icons/lu";

const Header = () => {
  const [theme, setTheme] = useContext(ThemesContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-[50%] -translate-x-[50%] container w-full h-[60px] px-[4vw] flex items-center justify-between z-30">
      <Link to="/" className="text-2xl dark:text-white">
        {chatbotConfig.name}
      </Link>
      <div className="" onClick={toggleTheme}>
        <button className="text-2xl rounded-full hover:bg-surface dark:hover:bg-dm-surface p-2 [&>svg>path]:dark:text-white [&>svg>circle]:dark:text-white">
          {theme === "light" ? <LuMoon /> : <LuSun />}
        </button>
      </div>
    </header>
  );
};

export default Header;
