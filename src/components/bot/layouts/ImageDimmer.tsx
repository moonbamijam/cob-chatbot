type ImageDimmerProps = Partial<
  Readonly<{
    className: string;
    image: string;
  }>
>;

const ImageDimmer = ({ className, image }: ImageDimmerProps) => {
  return (
    <img
      id="image-dimmer"
      src={image}
      alt=""
      className={`w-full h-full fixed inset-0 object-cover z-50 blur-xl backdrop-blur-xl brightness-50 ${className}`}
    />
  );
};

export default ImageDimmer;
