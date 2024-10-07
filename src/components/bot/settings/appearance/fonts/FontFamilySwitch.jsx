import { useContext } from "react";
import fontFamilies from "../../../../../../static/settings/font_families.json";

// context
import { FontContext } from "../../../../../contexts/FontContext";

// components
import RadioButton from "../../../buttons/RadioButton";
import SettingsMiniTitle from "../../SettingsMiniTitle";
import Grid from "../../../common/Grid";
import SettingSwitch from "../../../sections/SettingSwitch";
import ItemsRenderer from "../../../../common/ItemsRenderer";

const FontFamilySwitch = () => {
  const { font } = useContext(FontContext);
  const [fontFamily, setFontFamily] = font.family;

  const handleChange = (event) => {
    setFontFamily(event.target.value);
  };

  return (
    <SettingSwitch>
      <SettingsMiniTitle text="font family" />
      <Grid>
        <ItemsRenderer
          items={fontFamilies.list}
          renderItems={(f) => (
            <RadioButton
              key={f.value}
              name="font-families"
              id={f.value}
              value={f.value}
              checkedIf={fontFamily == f.value}
              onChange={handleChange}
              onClick={() => font.changeFontFamily(f.value)}
              style={{ fontFamily: f.value }}
              displayedText={f.name}
            />
          )}
        />
      </Grid>
    </SettingSwitch>
  );
};

export default FontFamilySwitch;
