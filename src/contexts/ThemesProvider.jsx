import React, { useEffect, useState } from "react";

export const ThemesContext = React.createContext();

const ThemeMode = {
  Light: {
    name: "light",
    match: window.matchMedia("prefers-color-scheme: light"),
  },
  Dark: {
    name: "dark",
    match: window.matchMedia("prefers-color-scheme: dark"),
  },
  System: {
    name: "system",
    match: window.matchMedia("prefers-color-scheme: dark"),
  },
};

const ThemesProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    switch (theme) {
      case ThemeMode.Light.name:
        localStorage.setItem("theme", ThemeMode.Light.name);
        document.documentElement.setAttribute("theme", ThemeMode.Light.name);
        document.documentElement.classList.add(ThemeMode.Light.name);
        document.documentElement.classList.remove(
          ThemeMode.Dark.name,
          ThemeMode.System.name,
        );
        ThemeMode.Light.match;
        break;
      case ThemeMode.Dark.name:
        localStorage.setItem("theme", ThemeMode.Dark.name);
        document.documentElement.setAttribute("theme", ThemeMode.Dark.name);
        document.documentElement.classList.add(ThemeMode.Dark.name);
        document.documentElement.classList.remove(
          ThemeMode.Light.name,
          ThemeMode.System.name,
        );
        ThemeMode.Dark.match;
        break;
      case ThemeMode.System.name:
        localStorage.setItem("theme", ThemeMode.System.name);
        document.documentElement.setAttribute("theme", ThemeMode.System.name);
        document.documentElement.classList.add(ThemeMode.Dark.name);
        document.documentElement.classList.remove(
          ThemeMode.Light.name,
          ThemeMode.System.name,
        );
        ThemeMode.System.match;
        break;
      default:
        localStorage.setItem("theme", ThemeMode.Light.name);
        document.documentElement.setAttribute("theme", ThemeMode.Light.name);
        document.documentElement.classList.add(ThemeMode.Light.name);
        document.documentElement.classList.remove(
          ThemeMode.Dark.name,
          ThemeMode.System.name,
        );
        ThemeMode.Light.match;
        break;
    }
  }, [theme]);

  return (
    <ThemesContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemesContext.Provider>
  );
};

export default ThemesProvider;
