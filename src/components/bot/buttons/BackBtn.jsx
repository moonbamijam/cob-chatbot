import { IoMdArrowRoundBack } from "react-icons/io";

const BackBtn = ({ onClick, className, text }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`w-[120px] h-[50px] rounded-3xl bg-surface hover:bg-primary [&>svg>path]:hover:text-white [&>p]:hover:text-white dark:bg-dm-surface dark:hover:bg-primary text-black dark:text-white shadow-md flex justify-center items-center gap-1 ${className}`}
    >
      <IoMdArrowRoundBack />
      <p className="capitalize">{text}</p>
    </button>
  );
};

export default BackBtn;
