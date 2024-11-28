import { ImgHTMLAttributes, useState } from "react";
import { Link } from "react-router-dom";

// components
import Image from "@components/ui/Image";

type ChatbotTeamIconProps = ImgHTMLAttributes<HTMLImageElement> &
  Readonly<{
    to: string;
    text: string;
    role?: string;
  }>;

const ChatbotTeamIcon = ({
  to,
  src,
  alt,
  text,
  role,
}: ChatbotTeamIconProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Link
        to={to}
        target="_blank"
        pseudo-value={text}
        className={`relative flex justify-center items-center cursor-pointer rounded-full before:content-[attr(pseudo-value)] before:absolute before:text-7xl before:capitalize before:font-helvetica-rounded-bold before:opacity-0 hover:before:opacity-10 text-primary dark:text-secondary bg-inherit border-2 border-transparent hover:border-primary dark:hover:border-secondary overflow-hidden group`}
      >
        <Image
          src={src}
          alt={alt}
          variant="icon"
          size="xl"
          className={`group-hover:opacity-30 dark:group-hover:opacity-50 ${isImageLoaded ? "" : "w-[200px] animate-pulse bg-surface-dark dark:bg-dm-surface-light"}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <p className="absolute opacity-0 group-hover:opacity-100 text-xl md:text-2xl font-helvetica-rounded-bold capitalize">
          {text}
        </p>
      </Link>
      <div className="text-center">
        <p className="capitalize text-xl font-helvetica-rounded-bold">{text}</p>
        <span className="text-sm capitalize text-black/40 dark:text-white/40">
          {role}
        </span>
      </div>
    </div>
  );
};

export default ChatbotTeamIcon;
