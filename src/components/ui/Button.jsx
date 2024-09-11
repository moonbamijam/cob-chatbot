import { cva } from "class-variance-authority";

// utils
import { cn } from "../../utils/cn";

const buttonVariants = cva("w-full h-full rounded-full", {
  variants: {
    variant: {
      default: "bg-surface dark:bg-dm-surface",
      icon: "text-2xl rounded-full p-2 flex justify-center items-center",
      outline: "px-8 py-4 border border-primary",
      cta: "px-8 py-4 capitalize truncate",
      destructive: "px-8 py-4 bg-error hover:bg-error/80 capitalize",
      destructiveOutline:
        "px-8 py-4 border border-error hover:text-white dark:text-white hover:bg-error capitalize",
    },
    size: {
      default: "max-w-[50px]",
      sm: "max-w-[30px]",
      md: "max-w-[100px]",
      lg: "max-w-[150px]",
      xl: "max-w-[200px]",
      icon: "max-w-[40px] max-h-[40px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const Button = ({ className, size, variant, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ className, variant, size }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
