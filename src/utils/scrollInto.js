export const scrollInto = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};
