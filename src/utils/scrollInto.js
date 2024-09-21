export const scrollInto = (ref) => {
  ref.current?.scrollIntoView();
  return true;
};

export const smoothScrollInto = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
  return true;
};
