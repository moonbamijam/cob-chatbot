// Components
import { useContext } from "react";
import { FontContext } from "../../../../../contexts/FontProvider";
import { fontSizeList } from "../../../../../lib/settings/fontSizeList";

// components
import SettingsChangerBtn from "../../../buttons/SettingsChangerBtn";
import SettingsMiniTitle from "../../SettingsMiniTitle";
import Grid from "../../../common/Grid";
import SettingSwitch from "../../../sections/SettingSwitch";

const FontSizeSwitch = () => {
  const { font } = useContext(FontContext);
  const [fontSize, setFontSize] = font.size;

  const handleChange = (event) => {
    setFontSize(event.target.value);
  };

  const changeFontSize = (value) => {
    switch (value) {
      case 8:
        setFontSize(value);
        break;
      case 12:
        setFontSize(value);
        break;
      case 16:
        setFontSize(value);
        break;
      case 24:
        setFontSize(value);
        break;
      case 32:
        setFontSize(value);
        break;
      case 48:
        setFontSize(value);
        break;
      default:
        setFontSize(16);
        break;
    }
    localStorage.setItem("fontSize", value);
  };

  return (
    <SettingSwitch>
      <SettingsMiniTitle text="font sizes" />
      <Grid>
        {fontSizeList.map((font) => (
          <SettingsChangerBtn
            key={font.value}
            name="font-sizes"
            id={font.value}
            value={font.value}
            checkedIf={fontSize == font.value}
            onChange={handleChange}
            onClick={() => changeFontSize(font.value)}
            displayedText={font.name}
          />
        ))}
      </Grid>
    </SettingSwitch>
  );
};

export default FontSizeSwitch;
