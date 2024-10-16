type GridProps = {
  children: React.ReactNode;
  className: string;
};

const Grid = ({ children, className }: GridProps) => {
  return <div className={`inline-grid ${className}`}>{children}</div>;
};

export default Grid;
