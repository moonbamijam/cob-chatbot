import { MouseEventHandler } from "react";

type ArrowBtnProps = Readonly<{
  icon: React.ReactNode;
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}>;

const ArrowBtn = ({ icon, className, onClick }: ArrowBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`absolute ${className} w-[60px] h-full flex justify-center items-center z-50`}
    >
      <span className="text-primary [&>svg>path]:hover:text-white dark:text-white bg-white dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary rounded-full p-3 border dark:border-none">
        {icon}
      </span>
    </button>
  );
};

export default ArrowBtn;
