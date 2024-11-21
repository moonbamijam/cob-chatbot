import cityHallLogo from "@static/assets/images/city-hall-logo.png";

const Logo = () => {
  return (
    <a
      aria-label="Bacoor City Hall Logo"
      href="https://bacoor.gov.ph/"
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
