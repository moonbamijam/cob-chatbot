import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[10%]">
      <AiOutlineLoading3Quarters className="text-4xl animate-spin text-primary dark:text-dm-surface-light" />
    </div>
  );
};

export default Loading;
