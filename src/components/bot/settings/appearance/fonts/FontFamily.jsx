import { useContext } from "react";
import FontChangerBtn from "../../../buttons/FontChangerBtn";
import SettingsMiniTitle from "../../SettingsMiniTitle";
import { FontContext } from "../../../../../providers/FontProvider";
import { defaultFont, fontFamilies } from "../../../../../lib/fontFamilies";

const FontFamily = () => {
  const { family } = useContext(FontContext);
  const [fontFamily, setFontFamily] = family;

  const handleChange = (event) => {
    setFontFamily(event.target.value);
  };

  const changeFontFamily = (value) => {
    switch (value) {
      case defaultFont:
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
      default:
        setFontFamily(value);
        break;
    }
    localStorage.setItem("fontFamily", value);
  };

  return (
    <div className="">
      <SettingsMiniTitle text="font family" />
      <div className="inline-grid grid-cols-3 gap-5">
        {fontFamilies.map((font) => (
          <FontChangerBtn
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

export default FontFamily;
