import { RefObject } from "react";

export const scrollInto = (ref: RefObject<HTMLElement>) => {
  ref.current?.scrollIntoView();
  return true;
};

export const smoothScrollInto = (ref: RefObject<HTMLElement>) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
  return true;
};
