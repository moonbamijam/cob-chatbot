const Grid = ({ children }) => {
  return (
    <div className="inline-grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-3 gap-5">
      {children}
    </div>
  );
};

export default Grid;
