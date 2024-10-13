const Grid = ({ ...props }) => {
  return (
    <div
      className="inline-grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-3 gap-5"
      {...props}
    />
  );
};

export default Grid;
