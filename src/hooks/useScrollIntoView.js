import { useState } from "react";

const useScrollIntoView = () => {
  const [backToView, setBackToView] = useState("hide");

  const handleScrollIntoView = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return { backToView, setBackToView, handleScrollIntoView };
};

export default useScrollIntoView;
