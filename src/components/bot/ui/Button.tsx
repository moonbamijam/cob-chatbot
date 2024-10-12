import { LegacyRef, MouseEventHandler } from "react";

type ButtonType = Partial<
  Readonly<{
    children: React.ReactNode;
    ref: LegacyRef<HTMLButtonElement>;
    type: "submit" | "reset" | "button" | undefined;
    disabled: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
    state: boolean;
    className: string;
  }>
>;

const Button = ({
  children,
  ref,
  type,
  disabled,
  onClick,
  state,
  className,
}: ButtonType) => {
  let buttonTypeStyling = "";
  let stateStyling = "";

  switch (type) {
    case "submit":
      buttonTypeStyling = "active:translate-x-2";
      break;
    case "reset":
      buttonTypeStyling = "active:tranform active:scale-75";
  }

  if (state) {
    switch (state) {
      case true:
        stateStyling = "bg-primary [&>svg>line]:text-white";
        break;
      default:
        break;
    }
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-full flex items-center justify-center text-2xl text-primary cursor-pointer ${buttonTypeStyling} ${stateStyling} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
