const SuggestedQuestionBtn = ({ question, onClick, className }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`rounded-3xl border border-highlight text-highlight px-4 py-3 hover:shadow hover:shadow-gray-300 hover:bg-highlight hover:text-white active:translate-y-2  ${className}`}
    >
      {question}
    </button>
  );
};

export default SuggestedQuestionBtn;
