import { FaCircle } from "react-icons/fa6";
const GradientLoadingSpinner = () => {
  return (
    <div className="fixed w-full h-full bottom-0 left-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl flex items-center justify-center gap-5">
      <FaCircle className="text-primary animate-bounce [animation-delay:-0.3s]" />
      <FaCircle className="text-secondary animate-bounce [animation-delay:-0.15s]" />
      <FaCircle className="text-tertiary animate-bounce" />
    </div>
  );
};

export default GradientLoadingSpinner;
