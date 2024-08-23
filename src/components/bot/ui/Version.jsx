import Package from "../../../../package.json";

const Version = ({ className }) => {
  return (
    <div>
      <div className={`${className}`}>Version {Package.version}</div>
    </div>
  );
};

export default Version;
