import { cva } from "class-variance-authority";

// utils
import { cn } from "../../utils/cn";

const buttonVariants = cva("w-full h-full rounded-full", {
  variants: {
    variant: {
      default:
        "border dark:border-dm-surface-light bg-surface dark:bg-dm-surface",
      icon: "text-2xl rounded-full p-3 flex justify-center items-center",
      outline: "px-4 py-3 border border-primary",
      cta: "px-8 py-4 capitalize truncate",
      destructive: "px-8 py-4 bg-error hover:bg-error/80 capitalize",
      destructiveOutline:
        "px-4 py-3 border border-error hover:text-white dark:text-white hover:bg-error capitalize",
      radio:
        "bg-surface has-[input]:hover:bg-primary [&>label]:hover:text-white has-[input]:dark:hover:bg-primary dark:bg-dm-surface [&>label]:dark:text-white has-[:checked]:bg-primary has-[:checked]:dark:bg-primary has-[:checked]:hover:bg-primary-dark has-[:checked]:text-white shadow-md px-4 py-3 flex justify-center items-center rounded-3xl",
    },
    size: {
      default: "w-max h-max",
      sm: "max-w-[30px]",
      md: "max-w-[100px] max-h-[40px]",
      lg: "max-w-[150px] max-h-[60px]",
      xl: "max-w-[200px] max-h-[80px]",
      icon: "max-w-[50px] max-h-[50px]",
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
