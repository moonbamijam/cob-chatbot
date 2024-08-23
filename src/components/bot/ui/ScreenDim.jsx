const ScreenDim = ({ className, message }) => {
  return (
    <div
      id="screen-dimmer"
      className={`w-full h-full fixed top-0 inset-x-0 flex justify-center items-center pr-[30%] ${className}`}
    >
      <p className="text-lg text-gray-300 animate-bounce select-none">
        {message}
      </p>
    </div>
  );
};

export default ScreenDim;
