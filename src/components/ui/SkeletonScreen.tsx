import { forwardRef, HTMLAttributes, ImgHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";

// utils
import { cn } from "@utils/cn";

// library
import { skeletonScreenVariants } from "@lib/variants/skeleton-screen-variants";

type SkeletonScreenProps = HTMLAttributes<HTMLDivElement> &
  ImgHTMLAttributes<HTMLImageElement> &
  VariantProps<typeof skeletonScreenVariants> & {};

const SkeletonScreen = forwardRef<HTMLDivElement, SkeletonScreenProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonScreenVariants({ className, variant }))}
        {...props}
      />
    );
  },
);

export default SkeletonScreen;
