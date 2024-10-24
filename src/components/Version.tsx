import Package from "@/package.json";

type VersionProps = Partial<{
  className: string;
  text: string;
}>;

const Version = ({ className, text }: VersionProps) => {
  return (
    <div className={`${className}`}>
      {text}
      {Package.version}
    </div>
  );
};

export default Version;
