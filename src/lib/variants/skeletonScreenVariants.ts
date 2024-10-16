import { cva } from "class-variance-authority";

export const skeletonScreenVariants = cva(
  "w-full h-full animate-pulse pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-surface-dark dark:bg-dm-surface-light",
        icon: "rounded-full aspect-square",
        chat: "max-w-[80%] rounded-3xl overflow-hidden",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
