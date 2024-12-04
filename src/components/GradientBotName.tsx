type GradientBotNameProps = {
  className?: string;
  children: React.ReactNode;
};
const GradientBotName = ({ className, children }: GradientBotNameProps) => {
  return (
    <div
      className={`${className} bg-gradient-to-tr from-primary from-35% via-tertiary via-70% to-secondary bg-clip-text text-transparent cursor-default select-none`}
    >
      {children}
    </div>
  );
};

export default GradientBotName;
