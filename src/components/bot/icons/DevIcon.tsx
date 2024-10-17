import { ImgHTMLAttributes } from "react";
import { Link } from "react-router-dom";

// components
import Image from "@components/ui/Image";
import SkeletonScreen from "@components/ui/SkeletonScreen";

type DevIconProps = ImgHTMLAttributes<HTMLImageElement> &
  Readonly<{
    to: string;
    text: string;
  }>;

const DevIcon = ({ to, src, alt, text }: DevIconProps) => {
  return (
    <>
      {src ? (
        <Link
          to={to}
          target="_blank"
          className="relative flex justify-center items-center cursor-pointer rounded-full group"
        >
          <Image
            src={src}
            alt={alt}
            variant="icon"
            size="xl"
            className={`group-hover:opacity-60 dark:group-hover:opacity-50`}
          />
          <p className="absolute opacity-0 group-hover:opacity-100 text-white text-xl font-helvetica-rounded-bold capitalize">
            {text}
          </p>
        </Link>
      ) : (
        <SkeletonScreen variant="icon" className="w-full" />
      )}
    </>
  );
};

export default DevIcon;
