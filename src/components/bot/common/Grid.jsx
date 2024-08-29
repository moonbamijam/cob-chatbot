const Grid = ({ children }) => {
  return (
    <div className="inline-grid grid-cols-2 md:grid-cols-3 gap-5">
      {children}
    </div>
  );
};

export default Grid;
