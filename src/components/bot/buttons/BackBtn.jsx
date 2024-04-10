import { IoMdArrowRoundBack } from "react-icons/io";

const BackBtn = ({ onClick, text }) => {
  return (
    <button
      onClick={() => onClick()}
      className="w-[120px] h-[50px] rounded-3xl bg-gray-500 hover:bg-red-500 flex justify-center items-center gap-1 ml-auto mt-5"
    >
      <IoMdArrowRoundBack className="text-white" />
      <p className="capitalize text-white">{text}</p>
    </button>
  );
};

export default BackBtn;
