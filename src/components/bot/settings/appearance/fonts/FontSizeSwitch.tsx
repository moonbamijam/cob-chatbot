import { ChangeEvent, useContext } from "react";
import { fontSizeList } from "../../../../../lib/settings/fontSizeList";

// context
import { FontContext } from "../../../../../contexts/FontContext";

// components
import RadioButton from "../../../buttons/RadioButton";
import SettingsMiniTitle from "../../SettingsMiniTitle";
import Grid from "../../../common/Grid";
import SettingSwitch from "../../../sections/SettingSwitch";
import ItemsRenderer from "../../../../common/ItemsRenderer";

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
