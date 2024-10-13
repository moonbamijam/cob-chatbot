type ImageCreditsProps = {
  link: string;
  displayedText: string;
  className: string;
};

const ImageCredits = ({
  link,
  displayedText,
  className,
}: ImageCreditsProps) => {
  return (
    <a
      href={link}
      target="_blank"
      className={`${className} absolute capitalize`}
    >
      {displayedText}
    </a>
  );
};

export default ImageCredits;
