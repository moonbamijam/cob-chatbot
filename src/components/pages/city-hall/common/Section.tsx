type SectionType = {
  children: React.ReactNode;
  className: string;
};

const Section = ({ children, className }: SectionType) => {
  return (
    <section
      className={`container w-[1021px] relative flex flex-col ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
