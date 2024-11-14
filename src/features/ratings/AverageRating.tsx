import { useContext } from "react";
import { cva, VariantProps } from "class-variance-authority";

// contexts
import { UserContext } from "@contexts/UserContext";

// utils
import { cn } from "@utils/cn";

// icons
import { FaStar } from "react-icons/fa6";

const StarVariant = cva("", {
  variants: {
    color: {
      default: "text-secondary",
    },
    size: {
      default: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      xxl: "text-2xl",
      xxxl: "text-3xl",
      four: "text-4xl",
      five: "text-5xl",
      six: "text-6xl",
      seven: "text-7xl",
    },
  },
  defaultVariants: {
    color: "default",
    size: "default",
  },
});

const NumberVariant = cva("", {
  variants: {
    numberSize: {
      xs: "text-xs",
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      xxl: "text-2xl",
      xxxl: "text-3xl",
      four: "text-4xl",
      five: "text-5xl",
      six: "text-6xl",
      seven: "text-7xl",
    },
  },
  defaultVariants: {
    numberSize: "default",
  },
});

type AverageRatingProps = VariantProps<typeof StarVariant> &
  VariantProps<typeof NumberVariant> &
  Partial<
    Readonly<{
      className: string;
    }>
  >;

const AverageRating = ({
  className,
  color,
  size,
  numberSize,
}: AverageRatingProps) => {
  const user = useContext(UserContext);
  const { averageRating } = user.rating;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <FaStar className={`${cn(StarVariant({ color, size }))}`} />
      <span
        className={`${cn(NumberVariant({ numberSize }))} dark:text-white/80`}
      >
        {averageRating}
      </span>
    </div>
  );
};

export default AverageRating;
