import { cva } from "class-variance-authority";

export const imageVariants = cva("w-full h-full", {
  variants: {
    variant: {
      default: "",
      icon: "rounded-full aspect-square object-cover",
      iconBorder:
        "rounded-full border border-primary aspect-square object-cover",
    },
    size: {
      default: "max-w-[80px]",
      sm: "max-w-[50px]",
      md: "max-w-[100px]",
      lg: "max-w-[150px]",
      xl: "max-w-[200px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
