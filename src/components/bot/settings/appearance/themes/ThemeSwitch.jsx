import { useContext } from "react";
import { ThemesContext } from "../../../../../contexts/ThemesProvider";
import themes from '../../../../../../static/settings/themes.json'

// components
import SettingsMiniTitle from "../../SettingsMiniTitle";
import SettingsChangerBtn from "../../../buttons/SettingsChangerBtn";

const ThemeSwitch = () => {
  const [theme, setTheme] = useContext(ThemesContext);

  const handleChange = (event) => {
    setTheme(event.target.value);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const changeThemes = (value) => {
    switch (value) {
      case "light":
        setTheme(value);
        break;
      case "dark":
        setTheme(value);
        break;
      case "system":
        setTheme(value);
        break;
      default:
        setTheme("light");
        break;
    }
  };

  return (
    <div className="">
      <SettingsMiniTitle text="theme" />
      <div className="inline-grid grid-cols-3 gap-5">
        {themes.modes.map((th, id) => (
          <SettingsChangerBtn
            key={id}
            name="themes"
            id={th.value}
            value={th.value}
            checkedIf={theme == th.value}
            onChange={handleChange}
            onClick={() => changeThemes(th.value)}
            displayedText={th.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitch;
