import { RefObject, useState } from "react";

const useScrollIntoView = () => {
  const [backToView, setBackToView] = useState<string>("hide");

  const handleScrollIntoView = (ref: RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return { backToView, setBackToView, handleScrollIntoView };
};

export default useScrollIntoView;
