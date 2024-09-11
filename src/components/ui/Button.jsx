import { cva } from "class-variance-authority";

// utils
import { cn } from "../../utils/cn";

const buttonVariants = cva("w-full h-full", {
  variants: {
    variant: {
      default: "rounded-3xl",
      icon: "text-2xl rounded-full p-2",
      outline: "border border-primary",
      cta: "px-8 py-4 rounded-[64px] capitalize truncate",
      destructive: "text-error hover:text-error/70",
    },
    size: {
      default: "max-w-[50px]",
      sm: "max-w-[30px]",
      md: "max-w-[100px]",
      lg: "max-w-[200px]",
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
