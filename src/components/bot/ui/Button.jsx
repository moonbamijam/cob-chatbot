const Button = ({ children, ref, type, disabled, onClick, state }) => {
  let buttonTypeStyling = "";
  let stateStyling = "";

  switch (type) {
    case "submit":
      buttonTypeStyling = "active:translate-x-2";
      break;
    case "reset":
      buttonTypeStyling = "active:tranform active:scale-75";
    default:
      break;
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
      className={`p-3 rounded-full flex items-center justify-center text-2xl text-primary hover:shadow-md cursor-pointer ${buttonTypeStyling} ${stateStyling} ${
        state
          ? "hover:bg-primary-dark"
          : "hover:bg-surface dark:hover:bg-dm-surface"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
