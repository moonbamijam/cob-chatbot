import React from "react";

const Section = ({ children }) => {
  return (
    <section className="container relative py-8 bg-white shadow shadow-gray-400 rounded-md">
      {children}
    </section>
  );
};

export default Section;
