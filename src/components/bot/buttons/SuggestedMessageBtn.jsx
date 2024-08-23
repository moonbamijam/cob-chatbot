const SuggestedMessageBtn = ({ message, onClick, className, isFaq }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isFaq && "w-[400px]"
      } rounded-3xl border border-primary text-primary dark:text-white px-4 py-3 hover:bg-primary hover:text-white active:translate-y-1 ${className}`}
    >
      {message}
    </button>
  );
};

export default SuggestedMessageBtn;
