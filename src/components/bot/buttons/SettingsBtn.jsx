import { IoSettingsSharp } from "react-icons/io5";

const SettingsBtn = ({ state, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`rounded-full p-4 hover:bg-highlight [&>svg>path]:hover:text-white  ${
        state && "bg-highlight [&>svg>path]:text-white"
      }`}
    >
      <IoSettingsSharp className={`${state && "rotate-90"} dark:text-white`} />
    </button>
  );
};

export default SettingsBtn;
