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
        <div className="flex flex-col items-center gap-4">
          <Link
            to={to}
            target="_blank"
            pseudo-value={text}
            className={`relative flex justify-center items-center cursor-pointer rounded-full before:content-[attr(pseudo-value)] before:absolute before:text-7xl before:capitalize before:font-helvetica-rounded-bold before:opacity-0 hover:before:opacity-10 text-primary dark:text-secondary  bg-inherit border-2 border-transparent hover:border-primary dark:hover:border-secondary overflow-hidden group`}
          >
            <Image
              src={src}
              alt={alt}
              variant="icon"
              size="xl"
              className="group-hover:opacity-30 dark:group-hover:opacity-50 "
            />
            <p className="absolute opacity-0 group-hover:opacity-100 text-2xl font-helvetica-rounded-bold capitalize">
              {text}
            </p>
          </Link>
          <p className="capitalize text-xl font-helvetica-rounded-bold">
            {text}
          </p>
        </div>
      ) : (
        <SkeletonScreen variant="icon" className="w-full" />
      )}
    </>
  );
};

export default DevIcon;
