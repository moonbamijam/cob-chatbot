import { useContext } from "react";
import themes_list from "../../../../../../static/settings/themes.json";

// context
import { ThemeContext } from "../../../../../contexts/ThemeContext";

// components
import SettingsMiniTitle from "../../SettingsMiniTitle";
import RadioButton from "../../../buttons/RadioButton";
import Grid from "../../../common/Grid";
import SettingSwitch from "../../../sections/SettingSwitch";

const ThemeSwitch = () => {
  const { themes } = useContext(ThemeContext);
  const [theme, setTheme] = themes.default;

  const handleChange = (event) => {
    setTheme(event.target.value);
  };

  const changeThemes = (value) => {
    switch (value) {
      case "light":
        setTheme(value);
        break;
      case "dark":
        setTheme(value);
        break;
      default:
        setTheme("light");
        break;
    }
  };

  return (
    <SettingSwitch>
      <SettingsMiniTitle text="theme" />
      <Grid>
        {themes_list.modes.map((thm, id) => (
          <RadioButton
            key={id}
            name="themes"
            id={thm.value}
            value={thm.value}
            checkedIf={theme == thm.value}
            onChange={handleChange}
            onClick={() => changeThemes(thm.value)}
            displayedText={thm.name}
          />
        ))}
      </Grid>
    </SettingSwitch>
  );
};

export default ThemeSwitch;
