import FontSizes from "../sections/FontSizes";
import SettingsTitle from "./SettingsTitle";

const Fonts = () => {
  return (
    <section className="">
      <SettingsTitle text={"change font size"} />
      <FontSizes />
    </section>
  );
};

export default Fonts;
