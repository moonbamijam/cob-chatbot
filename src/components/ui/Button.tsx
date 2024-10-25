import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps } from "class-variance-authority";

// utils
import { cn } from "@utils/cn";

// library
import { buttonVariants } from "@lib/variants/button-variants";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ className, variant, size }))}
        {...props}
      />
    );
  },
);

export default Button;
