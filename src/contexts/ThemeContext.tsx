import React from "react";

type ThemeContextType = {
  default: {
    resolvedTheme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
  };
  toggleTheme: () => void;
  changeTheme: (value: string) => void;
};

export const ThemeContext = React.createContext({} as ThemeContextType);
