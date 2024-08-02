// Components
import { useContext } from "react";
import { FontContext } from "../../../../../providers/FontProvider";
import FontChangerBtn from "../../../buttons/FontChangerBtn";
import SettingsMiniTitle from "../../SettingsMiniTitle";
import { fontSizes } from "../../../../../lib/fontSizes";

const FontSizeSwitch = () => {
  const { size } = useContext(FontContext);
  const [fontSize, setFontSize] = size;

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
    <div className="">
      <SettingsMiniTitle text="font sizes" />
      <div className="inline-grid grid-cols-3 gap-5">
        {fontSizes.map((font) => (
          <FontChangerBtn
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
      </div>
    </div>
  );
};

export default FontSizeSwitch;