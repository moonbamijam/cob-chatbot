import React, { useEffect, useState } from "react";

export const ThemesContext = React.createContext();

const ThemesProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    if (theme === "dark") {
      window.matchMedia("prefer-color-scheme: dark");
      localStorage.setItem("theme", "dark");
    } else {
      window.matchMedia("prefer-color-scheme: light");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <ThemesContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemesContext.Provider>
  );
};

export default ThemesProvider;
