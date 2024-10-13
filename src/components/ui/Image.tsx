import { forwardRef, ImgHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";

// utils
import { cn } from "../../utils/cn";

// library
import { imageVariants } from "../../lib/variants/imageVariants";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> &
  VariantProps<typeof imageVariants> & {};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, className, size, variant, ...props }, ref) => {
    return (
      <img
        src={src}
        alt={alt}
        ref={ref}
        className={cn(imageVariants({ className, variant, size }))}
        {...props}
      />
    );
  },
);
