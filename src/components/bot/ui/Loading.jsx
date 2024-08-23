import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[30%]">
      <AiOutlineLoading3Quarters className="text-4xl animate-spin dark:text-white" />
    </div>
  );
};

export default Loading;
