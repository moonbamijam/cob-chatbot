import { useContext } from "react";
import { chatbotConfig } from "../../lib/bot/chatbotConfig";
import { Link } from "react-router-dom";

// context
import { ThemeContext } from "../../contexts/ThemeContext";

// components
import { Button } from "../ui/Button";

// icons
import { LuSun, LuMoon } from "react-icons/lu";

const Header = () => {
  const { themes } = useContext(ThemeContext);
  const [theme, setTheme] = themes.default;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-[50%] -translate-x-[50%] container w-full h-[70px] px-[4vw] md:px-[2vw] lg:px-[4vw] flex items-center justify-between z-30">
      <Link to="/" className="text-2xl dark:text-white">
        {chatbotConfig.name}
      </Link>
      <Button
        onClick={toggleTheme}
        variant="icon"
        size="icon"
        className=" hover:bg-surface dark:hover:bg-dm-surface [&>svg>path]:dark:text-white [&>svg>circle]:dark:text-white"
      >
        {theme === "light" ? <LuMoon /> : <LuSun />}
      </Button>
    </header>
  );
};

export default Header;
