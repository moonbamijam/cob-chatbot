const SettingsBtn = ({ name, checkedIf, onClick, onChange, icon, state }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`${state ? "w-full" : "w-max sm:w-full "} flex rounded-lg text-left font-semibold hover:bg-gray-300 dark:hover:bg-dm-surface dark:text-white`}
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
        className={`${state ? "w-full" : "w-max sm:w-full "} capitalize rounded-lg px-4 py-3 text-black/60 dark:text-white/50 peer-checked:text-white peer-checked:bg-primary peer-checked:group-checked:bg-primary peer-checked:hover:bg-primary-dark cursor-pointer truncate`}
      >
        {state ? (
          <span className="md:block">{name}</span>
        ) : (
          <>
            <span className="hidden md:block">{name}</span>
            <div className="text-xl md:hidden">{icon}</div>
          </>
        )}
      </label>
    </button>
  );
};

export default SettingsBtn;
