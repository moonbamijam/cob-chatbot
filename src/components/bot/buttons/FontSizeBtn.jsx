const FontSizeBtn = ({ name, value, state, onClick, onChange }) => {
  return (
    <button onClick={() => onClick()} className="active:translate-y-1">
      <input
        type="radio"
        name="font-sizes"
        id={name}
        value={value}
        checked={state == value}
        onChange={onChange}
        className="hidden peer"
      />
      <label
        htmlFor={name}
        className="bg-gray-300 hover:bg-highlight hover:text-white dark:hover:bg-highlight dark:bg-gray-500 dark:text-white peer-checked:bg-highlight peer-checked:text-white w-[120px] h-[50px] flex justify-center items-center rounded-3xl capitalize cursor-pointer"
      >
        {name}
      </label>
    </button>
  );
};

export default FontSizeBtn;
