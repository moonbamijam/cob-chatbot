const SuggestedQuestionBtn = ({ question, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      style={{ width: 400 }}
      className={`rounded-3xl border border-primary text-primary dark:text-white px-4 py-3 hover:bg-primary hover:text-white active:translate-y-1 ${className}`}
    >
      {question}
    </button>
  );
};

export default SuggestedQuestionBtn;
