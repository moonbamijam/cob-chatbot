const Anchor = ({ href, text }) => {
  return (
    <a href={href} className="capitalize font-bold py-5">
      {text}
    </a>
  );
};

export default Anchor;
