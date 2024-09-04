const SuggestedMessageBtn = ({ message, onClick, className, isFaq }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl border border-primary text-xs xs:text-sm sm:text-base text-primary dark:text-white px-4 py-3 hover:bg-primary hover:text-white active:translate-y-1 ${className}`}
    >
      {message}
    </button>
  );
};

export default SuggestedMessageBtn;
