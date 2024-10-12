import { forwardRef, ImgHTMLAttributes } from "react";

// utils
import { cn } from "../../utils/cn";
import { VariantProps } from "class-variance-authority";
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
