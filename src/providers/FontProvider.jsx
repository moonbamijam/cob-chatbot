import React, { useEffect, useState } from "react";

export const FontContext = React.createContext();

const FontProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem("fontSize")),
  );
  // REMEMBER TO USE "parseInt" since we're always getting a string in localStorage even it is a number
  const [fontFamily, setFontFamily] = useState(
    localStorage.getItem("fontFamily"),
  );

  useEffect(() => {
    if (localStorage.getItem("fontSize") == null) {
      const initialFontSize = 16;

      setFontSize(initialFontSize);
      localStorage.setItem("fontSize", initialFontSize);
    }
    if (localStorage.getItem("fontFamily") == null) {
      const initialFontFamily =
        "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji";

      setFontFamily(initialFontFamily);
      localStorage.setItem("fontFamily", initialFontFamily);
    }
  }, []);

  return (
    <FontContext.Provider
      value={{
        size: [fontSize, setFontSize],
        family: [fontFamily, setFontFamily],
      }}
    >
      {children}
    </FontContext.Provider>
  );
};

export default FontProvider;
