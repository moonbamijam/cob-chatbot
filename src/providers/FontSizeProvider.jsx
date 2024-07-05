import React, { useEffect, useState } from "react";

export const FontSizeContext = React.createContext();

const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem("fontSize")),
  );
  // REMEMBER TO USE "parseInt" since we're always getting a string in localStorage even it is a number

  useEffect(() => {
    if (localStorage.getItem("fontSize") == null) {
      const initialFontSize = 16;
      setFontSize(initialFontSize);
      localStorage.setItem("fontSize", initialFontSize);
    }
  }, []);

  return (
    <FontSizeContext.Provider value={[fontSize, setFontSize]}>
      {children}
    </FontSizeContext.Provider>
  );
};

export default FontSizeProvider;
