const Section = ({ children, className }) => {
  return (
    <section
      className={`container w-[1021px] relative flex flex-col ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
