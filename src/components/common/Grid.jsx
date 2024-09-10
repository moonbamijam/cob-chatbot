const Grid = ({ children, className }) => {
  return <div className={`${className} inline-grid`}>{children}</div>;
};

export default Grid;
