import { Button } from "../../ui/Button";

const RadioButton = ({
  name,
  id,
  value,
  checkedIf,
  onClick,
  onChange,
  style,
  displayedText,
}) => {
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
