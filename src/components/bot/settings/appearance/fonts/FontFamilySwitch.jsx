import { useContext } from "react";
import { FontContext } from "../../../../../contexts/FontProvider";
import fontFamilies from "../../../../../../static/settings/font_families.json";

// components
import SettingsChangerBtn from "../../../buttons/SettingsChangerBtn";
import SettingsMiniTitle from "../../SettingsMiniTitle";
import Grid from "../../../common/Grid";
import SettingSwitch from "../../../sections/SettingSwitch";

const FontFamilySwitch = () => {
  const { font } = useContext(FontContext);
  const [fontFamily, setFontFamily] = font.family;

  const handleChange = (event) => {
    setFontFamily(event.target.value);
  };

  const changeFontFamily = (value) => {
    switch (value) {
      case fontFamilies.default:
        setFontFamily(value);
        break;
      case "raleway":
        setFontFamily(value);
        break;
      case "cursive":
        setFontFamily(value);
        break;
      case "poppins":
        setFontFamily(value);
        break;
      case "monospace":
        setFontFamily(value);
        break;
      case "montserrat":
        setFontFamily(value);
        break;
      default:
        setFontFamily(fontFamilies.default);
        break;
    }
    localStorage.setItem("fontFamily", value);
  };

  return (
    <SettingSwitch>
      <SettingsMiniTitle text="font family" />
      <Grid>
        {fontFamilies.list.map((font) => (
          <SettingsChangerBtn
            key={font.value}
            name="font-families"
            id={font.value}
            value={font.value}
            checkedIf={fontFamily == font.value}
            onChange={handleChange}
            onClick={() => changeFontFamily(font.value)}
            style={{ fontFamily: font.value }}
            displayedText={font.name}
          />
        ))}
      </Grid>
    </SettingSwitch>
  );
};

export default FontFamilySwitch;
