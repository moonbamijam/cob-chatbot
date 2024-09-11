const ImageCredits = ({ link, displayedText, className }) => {
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
