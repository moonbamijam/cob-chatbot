const SettingsBtn = ({ name, checkedIf, onClick, onChange }) => {
  return (
    <button
      onClick={() => onClick()}
      className="w-full flex rounded-lg text-left font-semibold hover:bg-gray-300 dark:hover:bg-dm-surface dark:text-white"
    >
      <input
        type="radio"
        name="settings"
        id={name}
        value={name}
        checked={checkedIf}
        onChange={onChange}
        className="hidden peer"
      />
      <label
        htmlFor={name}
        className="capitalize rounded-lg w-full px-4 py-3 text-black/60 dark:text-white/50 peer-checked:text-white peer-checked:bg-primary peer-checked:group-checked:bg-primary peer-checked:hover:bg-primary-dark cursor-pointer truncate"
      >
        {name}
      </label>
    </button>
  );
};

export default SettingsBtn;
