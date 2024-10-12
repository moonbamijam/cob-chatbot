import { ChangeEventHandler, MouseEventHandler } from "react";
import { buttonVariants } from "../../../lib/variants/buttonVariants";

type SettingsBtnType = {
  name: string;
  checkedIf: boolean;
  onClick: MouseEventHandler<HTMLLabelElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  state: boolean;
  icon: React.ReactNode;
};

const SettingsBtn = ({
  name,
  checkedIf,
  onClick,
  onChange,
  state,
  icon,
}: SettingsBtnType) => {
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
