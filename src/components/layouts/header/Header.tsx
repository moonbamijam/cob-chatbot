import { useContext } from "react";
import { Link } from "react-router-dom";
import { chatbotConfig } from "@src/lib/bot/chatbot-config";

// context
import { ThemeContext } from "@contexts/ThemeContext";

// components
import Button from "@components/ui/Button";

// icons
import { LuSun, LuMoon, LuMonitor } from "react-icons/lu";

const Header = () => {
  const themes = useContext(ThemeContext);
  const { resolvedTheme } = themes.default;

  const renderThemeIcon = () => {
    if (resolvedTheme === "system") {
      return <LuMonitor />;
    } else return resolvedTheme === "light" ? <LuMoon /> : <LuSun />;
  };

  return (
    <header className="fixed top-0 left-[50%] -translate-x-[50%] container w-full h-[70px] px-[4vw] md:px-[2vw] lg:px-[4vw] flex items-center justify-between z-30">
      <Link
        to="/"
        className="text-2xl dark:text-white bg-surface/30 dark:bg-dm-surface/50 rounded-lg p-2 backdrop-blur-sm sm:bg-transparent sm:dark:bg-transparent sm:rounded-none sm:p-0 sm:backdrop-blur-none"
      >
        {chatbotConfig.name}
      </Link>
      <Button
        onClick={themes.toggleTheme}
        variant="icon"
        size="icon"
        className="bg-surface/30 dark:bg-dm-surface/50 backdrop-blur-sm sm:bg-transparent sm:dark:bg-transparent sm:backdrop-blur-none hover:bg-surface dark:hover:bg-dm-surface [&>svg>path]:dark:text-white [&>svg>circle]:dark:text-white [&>svg>rect]:dark:text-white [&>svg>line]:dark:text-white"
      >
        {renderThemeIcon()}
      </Button>
    </header>
  );
};

export default Header;
