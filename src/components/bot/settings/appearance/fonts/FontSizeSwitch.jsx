// Components
import { useContext } from "react";
import { FontContext } from "../../../../../contexts/FontContext";
import { fontSizeList } from "../../../../../lib/settings/fontSizeList";

// components
import RadioButton from "../../../buttons/RadioButton";
import SettingsMiniTitle from "../../SettingsMiniTitle";
import Grid from "../../../common/Grid";
import SettingSwitch from "../../../sections/SettingSwitch";

const FontSizeSwitch = () => {
  const { font } = useContext(FontContext);
  const [fontSize, setFontSize] = font.size;

  const handleChange = (event) => {
    setFontSize(event.target.value);
  };

  return (
    <SettingSwitch>
      <SettingsMiniTitle text="font size" />
      <Grid>
        {fontSizeList.map((f) => (
          <RadioButton
            key={f.value}
            name="font-sizes"
            id={f.value}
            value={f.value}
            checkedIf={fontSize == f.value}
            onChange={handleChange}
            onClick={() => font.changeFontSize(f.value)}
            displayedText={f.name}
          />
        ))}
      </Grid>
    </SettingSwitch>
  );
};

export default FontSizeSwitch;
