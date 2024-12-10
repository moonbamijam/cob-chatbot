import { cva } from "class-variance-authority";

export const skeletonScreenVariants = cva(
  "w-full h-full animate-pulse rounded pointer-events-none",
  {
    variants: {
      variant: {
        default: "h-[100px] rounded-xl",
        icon: "rounded-full aspect-square",
        chat: "max-w-[80%] rounded-3xl overflow-hidden",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
