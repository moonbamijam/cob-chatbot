import { useContext } from "react";
import { FontContext } from "../../../../../contexts/FontProvider";
import fontFamilies from '../../../../../../static/settings/font_families.json'

// components
import SettingsChangerBtn from "../../../buttons/SettingsChangerBtn";
import SettingsMiniTitle from "../../SettingsMiniTitle";

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
    <div className="">
      <SettingsMiniTitle text="font family" />
      <div className="inline-grid grid-cols-3 gap-5">
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
      </div>
    </div>
  );
};

export default FontFamilySwitch;
