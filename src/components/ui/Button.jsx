import { cva } from "class-variance-authority";

// utils
import { cn } from "../../utils/cn";

const buttonVariants = cva("w-full h-full select-none", {
  variants: {
    variant: {
      default:
        "border dark:border-dm-surface-light bg-surface dark:bg-dm-surface",
      icon: "text-2xl rounded-full p-3 flex justify-center items-center",
      outline: "px-4 py-3 border border-primary rounded-full capitalize",
      cta: "px-8 py-4 capitalize rounded-full",
      destructive:
        "px-8 py-4 bg-error hover:bg-error/80 rounded-full capitalize",
      destructiveOutline:
        "px-4 py-3 border text-error dark:text-error border-error hover:text-white dark:hover:text-white bg-inherit dark:bg-inherit hover:bg-error dark:hover:bg-error rounded-full capitalize",
      radio:
        "bg-surface has-[input]:hover:bg-primary [&>label]:hover:text-white has-[input]:dark:hover:bg-primary dark:bg-dm-surface [&>label]:dark:text-white has-[:checked]:bg-primary has-[:checked]:dark:bg-primary has-[:checked]:hover:bg-primary-dark has-[:checked]:text-white shadow-md px-4 py-3 flex justify-center items-center rounded-3xl",
      settings:
        "flex rounded-lg text-left font-helvetica-bold hover:bg-gray-300 dark:hover:bg-dm-surface [&>span]:text-black/60 [&>span]:dark:text-white/60 [&>span]:has-[:checked]:text-white [&>span]:has-[:checked]:dark:text-white [&>div>svg>path]:text-black/60 [&>div>svg>path]:dark:text-white/60 [&>div>svg>path]:has-[:checked]:text-white [&>div>svg>path]:has-[:checked]:dark:text-white [&>div>svg>circle]:text-black/60 [&>div>svg>circle]:dark:text-white/60 [&>div>svg>circle]:has-[:checked]:text-white [&>div>svg>circle]:has-[:checked]:dark:text-white has-[:checked]:bg-primary has-[:checked]:hover:bg-primary has-[:checked]:dark:hover:bg-primary capitalize px-3 xs:px-4 py-3 cursor-pointer truncate",
    },
    size: {
      default: "w-max h-max",
      sm: "max-w-[30px]",
      md: "max-w-[100px] max-h-[40px]",
      lg: "max-w-[150px] max-h-[60px]",
      xl: "max-w-[200px] max-h-[80px]",
      icon: "max-w-[50px] max-h-[50px]",
      full: "w-full h-full",
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
