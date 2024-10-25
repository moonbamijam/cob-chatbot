import cityHallLogo from "@static/assets/images/city-hall-logo.png";

const Logo = () => {
  return (
    <a
      aria-label="Bacoor City Hall Logo"
      href="/bacoor-gov"
      className="w-[125px] h-[125px] mx-auto"
    >
      <img
        src={cityHallLogo}
        alt="Bacoor City Hall Logo"
        id="main-logo"
        className="rounded-full"
      />
    </a>
  );
};

export default Logo;
