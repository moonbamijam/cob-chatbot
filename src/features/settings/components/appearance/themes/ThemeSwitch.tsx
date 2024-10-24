import { ChangeEvent, useContext } from "react";
import themes_list from "@static/settings/themes.json";

// context
import { ThemeContext } from "@contexts/ThemeContext";

// components
import SettingsMiniTitle from "@features/settings/components/SettingsMiniTitle";
import RadioButton from "@components/buttons/RadioButton";

// layouts
import Grid from "@layouts/Grid";
import SettingSwitch from "@features/settings/layouts/SettingSwitch";
import ItemsRenderer from "@layouts/ItemsRenderer";

type ThemeType = {
  id: string;
  name: string;
  value: string;
};

const ThemeSwitch = () => {
  const themes = useContext(ThemeContext);
  const { resolvedTheme, setTheme } = themes.default;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value);
  };

  return (
    <SettingSwitch>
      <SettingsMiniTitle text="theme" />
      <Grid>
        <ItemsRenderer
          items={themes_list.modes}
          renderItems={(thm: ThemeType) => (
            <RadioButton
              key={thm.id}
              name="themes"
              id={thm.value}
              value={thm.value}
              checkedIf={resolvedTheme == thm.value}
              onChange={handleChange}
              onClick={() => themes.changeTheme(thm.value)}
              displayedText={thm.name}
            />
          )}
        />
      </Grid>
    </SettingSwitch>
  );
};

export default ThemeSwitch;
