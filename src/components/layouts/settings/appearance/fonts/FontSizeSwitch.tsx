import { ChangeEvent, useContext } from "react";
import { fontSizeList } from "@constants/settings/font-size-list";

// context
import { FontContext } from "@contexts/FontContext";

// components
import RadioButton from "@components/buttons/RadioButton";
import SettingsMiniTitle from "@src/components/layouts/settings/SettingsMiniTitle";
import Grid from "@src/components/common/Grid";
import SettingSwitch from "@src/components/sections/SettingSwitch";
import ItemsRenderer from "@components/common/ItemsRenderer";

const FontSizeSwitch = () => {
  const font = useContext(FontContext);
  const { fontSize, setFontSize } = font.size;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(event.target.value));
  };

  return (
    <SettingSwitch>
      <SettingsMiniTitle text="font size" />
      <Grid>
        <ItemsRenderer
          items={fontSizeList}
          renderItems={(f) => (
            <RadioButton
              key={f.value}
              name="font-sizes"
              id={f.value.toString()}
              value={f.value}
              checkedIf={fontSize == f.value}
              onChange={handleChange}
              onClick={() => font.changeFontSize(f.value)}
              displayedText={f.name}
            />
          )}
        />
      </Grid>
    </SettingSwitch>
  );
};

export default FontSizeSwitch;
