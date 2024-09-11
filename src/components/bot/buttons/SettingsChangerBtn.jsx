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
      <label
        htmlFor={id}
        className={`bg-surface has-[input]:hover:bg-primary has-[input]:hover:text-white has-[input]:dark:hover:bg-primary dark:bg-dm-surface dark:text-white has-[:checked]:bg-primary has-[:checked]:dark:bg-primary has-[:checked]:hover:bg-primary-dark has-[:checked]:text-white shadow-md w-[120px] h-[50px] px-4 py-3 flex justify-center items-center rounded-3xl capitalize cursor-pointer truncate`}
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
    </button>
  );
};

export default SettingsChangerBtn;
