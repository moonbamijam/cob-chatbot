const SettingsChangerBtn = ({
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
    <button onClick={onClick} className="active:translate-y-1">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checkedIf}
        onChange={onChange}
        className="hidden peer"
      />
      <label
        htmlFor={id}
        className={`bg-surface hover:bg-primary hover:text-white dark:hover:bg-primary dark:bg-dm-surface dark:text-white peer-checked:bg-primary peer-checked:hover:bg-primary-dark peer-checked:text-white shadow-md w-[120px] h-[50px] px-4 py-3 flex justify-center items-center rounded-3xl capitalize cursor-pointer truncate`}
        style={style}
      >
        {displayedText}
      </label>
    </button>
  );
};

export default SettingsChangerBtn;
