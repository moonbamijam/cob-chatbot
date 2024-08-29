import Package from "../../../../package.json";

const Version = ({ className, text }) => {
  return (
    <div className={`${className}`}>
      {text}
      {Package.version}
    </div>
  );
};

export default Version;
