import React, { useState, useEffect, useMemo } from "react";
import { defaultFont } from "../lib/settings/fontFamilyList";

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
      const initialFontFamily = defaultFont;

      setFontFamily(initialFontFamily);
      localStorage.setItem("fontFamily", initialFontFamily);
    }
  }, []);

  const font = useMemo(() => {
    return {
      font: {
        size: [fontSize, setFontSize],
        family: [fontFamily, setFontFamily],
      },
    };
  }, [fontSize, setFontSize, fontFamily, setFontFamily]);

  return <FontContext.Provider value={font}>{children}</FontContext.Provider>;
};

export default FontProvider;
