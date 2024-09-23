import { buttonVariants } from "../../ui/Button";

const SettingsBtn = ({ name, checkedIf, onClick, onChange, icon, state }) => {
  return (
    <label
      htmlFor={name}
      className={`${state ? "w-full" : "w-max md:w-full "} ${buttonVariants({ variant: "settings", size: "full" })}`}
      onClick={onClick}
    >
      <input
        type="radio"
        name="settings"
        id={name}
        value={name}
        checked={checkedIf}
        onChange={onChange}
        className="hidden"
      />
      {state ? (
        <span className="md:block max-w-full truncate">{name}</span>
      ) : (
        <>
          <span className="hidden md:block max-w-full truncate">{name}</span>
          <div className="text-xl p-0 md:hidden">{icon}</div>
        </>
      )}
    </label>
  );
};

export default SettingsBtn;
