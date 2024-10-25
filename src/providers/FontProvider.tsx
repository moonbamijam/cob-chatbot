import { useState, useEffect, useMemo } from "react";
import { FontContext } from "@contexts/FontContext";

import fontFamilies from "@static/settings/font_families.json";

const getFontSize = () => {
  const fontSize = parseInt(localStorage.getItem("fontSize") || "");
  return fontSize ? fontSize : 16;
};

const getFontFamily = () => {
  const fontFamily = localStorage.getItem("fontFamily");
  return fontFamily ? fontFamily : fontFamilies.default;
};

const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSize, setFontSize] = useState(getFontSize);
  const [fontFamily, setFontFamily] = useState(getFontFamily);

  // listener
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize.toString());
    localStorage.setItem("fontFamily", fontFamily);
  }, [fontSize, fontFamily]);

  const changeFontSize = (value: number) => {
    switch (value) {
      case 8:
        setFontSize(value);
        break;
      case 12:
        setFontSize(value);
        break;
      case 16:
        setFontSize(value);
        break;
      case 24:
        setFontSize(value);
        break;
      case 32:
        setFontSize(value);
        break;
      case 48:
        setFontSize(value);
        break;
    }
  };

  const changeFontFamily = (value: string) => {
    switch (value) {
      case fontFamilies.default:
        setFontFamily(value);
        break;
      case "cursive":
        setFontFamily(value);
        break;
      case "monospace":
        setFontFamily(value);
        break;
      case "Poppins":
        setFontFamily(value);
        break;
      case "Raleway":
        setFontFamily(value);
        break;
      case "Montserrat":
        setFontFamily(value);
        break;
      case "Lato":
        setFontFamily(value);
        break;
      case "Kanit":
        setFontFamily(value);
        break;
      case "Playpen Sans":
        setFontFamily(value);
        break;
      case "Caveat":
        setFontFamily(value);
        break;
    }
  };

  const font = useMemo(() => {
    return {
      size: { fontSize, setFontSize },
      changeFontSize: changeFontSize,
      family: { fontFamily, setFontFamily },
      changeFontFamily: changeFontFamily,
    };
  }, [fontSize, setFontSize, fontFamily, setFontFamily]);

  return <FontContext.Provider value={font}>{children}</FontContext.Provider>;
};

export default FontProvider;
