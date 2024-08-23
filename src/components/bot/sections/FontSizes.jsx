import { useContext } from "react";

// Providers & Context
import { FontSizeContext } from "../../../providers/FontSizeProvider";

// Library
import { chatbot } from "../../../lib/botDetails";

// Components
import FontSizeBtn from "../buttons/FontSizeBtn";
import SampleUserChat from "../ui/SampleUserChat";
import SampleBotChat from "../ui/SampleBotChat";

// Icons
import { LuArrowBigDown } from "react-icons/lu";

const fontSizes = [
  {
    name: "small",
    size: 8,
  },
  {
    name: "medium",
    size: 12,
  },
  {
    name: "default",
    size: 16,
  },
  {
    name: "large",
    size: 24,
  },
  {
    name: "extra large",
    size: 32,
  },
  {
    name: "2XL",
    size: 48,
  },
];

const FontSizes = () => {
  const [fontSize, setFontSize] = useContext(FontSizeContext);

  const handleChange = (event) => {
    setFontSize(event.target.value);
  };

  const changeFontSize = (name) => {
    if (name === "small") setFontSize(8);
    if (name === "medium") setFontSize(12);
    if (name === "default") setFontSize(16);
    if (name === "large") setFontSize(24);
    if (name === "extra large") setFontSize(32);
    if (name === "2XL") setFontSize(48);
    localStorage.setItem("fontSize", fontSize);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="inline-grid grid-cols-3 gap-x-5 gap-y-2"
      >
        {fontSizes.map((font, id) => (
          <FontSizeBtn
            key={id}
            name={font.name}
            value={font.size}
            state={fontSize}
            onChange={handleChange}
            onClick={() => changeFontSize(font.name)}
          />
        ))}
      </form>
      <div className="w-full h-full mt-4">
        <div className="capitalize [&>svg>path]:dark:text-white flex justify-center items-center gap-2">
          <p className="dark:text-white">preview</p>
          <LuArrowBigDown className="text-lg" />
        </div>
        <SampleUserChat
          style={{ fontSize: fontSize }}
          message={`Sometimes, changing font sizes helps us to read text more clearly. Especially when we have eye problems 😵`}
        />
        <SampleUserChat
          style={{ fontSize: fontSize }}
          message={`You'll see the messages you send to ${chatbot.name} in this size.`}
        />
        <SampleBotChat
          style={{ fontSize: fontSize }}
          message={`Meanwhile, ${chatbot.name}'s messages will look like this.`}
        />
        <SampleBotChat
          style={{ fontSize: fontSize }}
          message={`And when ${chatbot.name} send a link message, it will look like this, `}
          linkedMessage={"Click here to download"}
        />
      </div>
    </div>
  );
};

export default FontSizes;
