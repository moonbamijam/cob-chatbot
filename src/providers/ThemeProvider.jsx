import { useState, useEffect, useMemo } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeMode = {
  Light: {
    name: "light",
    match: window.matchMedia("prefers-color-scheme: light"),
  },
  Dark: {
    name: "dark",
    match: window.matchMedia("prefers-color-scheme: dark"),
  },
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    switch (theme) {
      case ThemeMode.Light.name:
        localStorage.setItem("theme", ThemeMode.Light.name);
        document.documentElement.setAttribute("theme", ThemeMode.Light.name);
        document.documentElement.classList.add(ThemeMode.Light.name);
        document.documentElement.classList.remove(ThemeMode.Dark.name);
        ThemeMode.Light.match;
        break;
      case ThemeMode.Dark.name:
        localStorage.setItem("theme", ThemeMode.Dark.name);
        document.documentElement.setAttribute("theme", ThemeMode.Dark.name);
        document.documentElement.classList.add(ThemeMode.Dark.name);
        document.documentElement.classList.remove(ThemeMode.Light.name);
        ThemeMode.Dark.match;
        break;
      default:
        localStorage.setItem("theme", ThemeMode.Light.name);
        document.documentElement.setAttribute("theme", ThemeMode.Light.name);
        document.documentElement.classList.add(ThemeMode.Light.name);
        document.documentElement.classList.remove(ThemeMode.Dark.name);
        ThemeMode.Light.match;
        break;
    }
  }, [theme]);

  const themes = useMemo(() => {
    return {
      themes: {
        default: [theme, setTheme],
      },
    };
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
