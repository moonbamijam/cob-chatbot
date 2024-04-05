import { useState } from "react";
import { LuMaximize, LuMinimize } from "react-icons/lu";

const MaximizeBtn = ({ state, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className="rounded-full p-4 hover:bg-highlight [&>svg>path]:hover:text-white"
    >
      {state ? <LuMinimize /> : <LuMaximize />}
    </button>
  );
};

export default MaximizeBtn;
