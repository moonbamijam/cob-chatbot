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
        className="bg-surface hover:bg-primary hover:text-white dark:hover:bg-primary dark:bg-dm-surface dark:text-white peer-checked:bg-primary peer-checked:hover:bg-primary-dark peer-checked:text-white shadow-md w-[120px] h-[50px] flex justify-center items-center rounded-3xl capitalize cursor-pointer"
      >
        {name}
      </label>
    </button>
  );
};

export default FontSizeBtn;
