import { cva } from "class-variance-authority";

export const skeletonScreenVariants = cva(
  "w-full h-full bg-surface-dark dark:bg-dm-surface-light animate-pulse pointer-events-none",
  {
    variants: {
      variant: {
        default: "",
        icon: "rounded-full aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
