export const scrollInto = (ref) => {
  ref.current?.scrollIntoView();
};

export const smoothScrollInto = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};
