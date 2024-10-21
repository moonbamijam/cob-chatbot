import { ChangeEventHandler, CSSProperties, MouseEventHandler } from "react";

// components
import Button from "@components/ui/Button";

type RadioButtonProps = Readonly<
  Partial<{
    name: string;
    id: string;
    value: string | number | readonly string[];
    checkedIf: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
    onChange: ChangeEventHandler<HTMLInputElement>;
    style: CSSProperties;
    displayedText: string;
  }>
>;

const RadioButton = ({
  name,
  id,
  value,
  checkedIf,
  onClick,
  onChange,
  style,
  displayedText,
}: RadioButtonProps) => {
  return (
    <Button
      variant="radio"
      size="lg"
      className="w-[120px] capitalize active:translate-y-1"
      onClick={onClick}
    >
      <label
        htmlFor={id}
        className="pointer-events-none truncate"
        style={style}
      >
        <input
          type="radio"
          name={name}
          id={id}
          value={value}
          checked={checkedIf}
          onChange={onChange}
          className="hidden"
        />
        {displayedText}
      </label>
    </Button>
  );
};

export default RadioButton;
