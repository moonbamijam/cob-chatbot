import { Link } from "react-router-dom";

// components
import { Image } from "../../ui/Image";

type DevIconProps = Readonly<{
  to: string;
  src: string;
  alt: string;
  text: string;
}>;

const DevIcon = ({ to, src, alt, text }: DevIconProps) => {
  return (
    <Link
      to={to}
      target="_blank"
      className="relative flex justify-center items-center cursor-pointer rounded-full bg-black  group"
    >
      <Image
        src={src}
        alt={alt}
        variant="icon"
        size="xl"
        className="group-hover:opacity-60 dark:group-hover:opacity-50"
      />
      <p className="absolute opacity-0 group-hover:opacity-100 text-white text-xl font-helvetica-rounded-bold capitalize">
        {text}
      </p>
    </Link>
  );
};

export default DevIcon;
