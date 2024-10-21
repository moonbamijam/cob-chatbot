type AnchorType = {
  href: string;
  text: string;
};

const Anchor = ({ href, text }: AnchorType) => {
  return (
    <a href={href} className="capitalize font-bold py-5">
      {text}
    </a>
  );
};

export default Anchor;
