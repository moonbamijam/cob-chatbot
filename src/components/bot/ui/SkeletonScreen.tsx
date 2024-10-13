type SkeletonScreenProps = Partial<
  Readonly<{
    id: string;
    width: number | string;
    height: number | string;
    customStyles: string;
  }>
>;

const SkeletonScreen = ({
  id,
  width,
  height,
  customStyles,
}: SkeletonScreenProps) => {
  return (
    <div
      id={id}
      className={`max-w-[80%] rounded-3xl animate-pulse ${width} ${height} ${customStyles}`}
    ></div>
  );
};

export default SkeletonScreen;
