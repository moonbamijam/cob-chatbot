type SectionType = {
  children: React.ReactNode;
  className: string;
};

const Section = ({ children, className }: SectionType) => {
  return (
    <section
      className={`md:container md:max-w-[756px] lg:max-w-[1021px] flex flex-col ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
