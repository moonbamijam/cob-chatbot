import React from "react";

type FontContextType = {
  size: {
    fontSize: number;
    setFontSize: React.Dispatch<React.SetStateAction<number>>;
  };
  changeFontSize: (value: number) => void;
  family: {
    fontFamily: string;
    setFontFamily: React.Dispatch<React.SetStateAction<string>>;
  };
  changeFontFamily: (value: string) => void;
};

export const FontContext = React.createContext({} as FontContextType);
