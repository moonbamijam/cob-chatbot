import ThemeSwitchBtn from "../buttons/ThemeSwitchBtn";
import SettingsTitle from "./SettingsTitle";

const Themes = () => {
  return (
    <section className="">
      <SettingsTitle text={"change theme"} />
      <ThemeSwitchBtn />
    </section>
  );
};

export default Themes;
