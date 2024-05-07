const SkeletonScreen = ({ id, width, height, customStyles }) => {
  return (
    <div
      id={id}
      className={`rounded-3xl animate-pulse ${width} ${height} ${customStyles}`}
    ></div>
  );
};

export default SkeletonScreen;
