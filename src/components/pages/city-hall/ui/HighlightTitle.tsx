const HighlightTitle = ({ text }: { text: string }) => {
  return (
    <div className="bg-[#ff0202] px-3 capitalize text-white font-semibold text-sm rounded mr-auto inline">
      {text}
    </div>
  );
};

export default HighlightTitle;
