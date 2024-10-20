import { forwardRef, ImgHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";

// utils
import { cn } from "@utils/cn";

// library
import { imageVariants } from "@src/lib/variants/image-variants";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> &
  VariantProps<typeof imageVariants> & {};

const Image = forwardRef<HTMLImageElement, ImageProps>(
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

export default Image;
