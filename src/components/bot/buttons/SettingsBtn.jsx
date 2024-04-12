import { BsThreeDotsVertical } from "react-icons/bs";

const SettingsBtn = ({ state, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`rounded-full p-4 hover:bg-highlight [&>svg>path]:hover:text-white  ${
        state && "bg-highlight [&>svg>path]:text-white"
      }`}
    >
      <BsThreeDotsVertical
        className={`${state && "rotate-90"} dark:text-white`}
      />
    </button>
  );
};

export default SettingsBtn;
