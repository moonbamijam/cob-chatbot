import { Link } from "react-router-dom";

// layouts
import Header from "@layouts/header/Header";

// components
import Button from "@components/ui/Button";

const Error = () => {
  return (
    <>
      <Header />
      <div className="h-screen flex flex-col items-center justify-center gap-8 px-[5vw]">
        <h1 className="font-helvetica-compressed text-7xl md:text-8xl lg:text-[10.25rem] bg-gradient-to-tr from-primary from-35% via-tertiary via-70% to-secondary bg-clip-text text-transparent cursor-default select-none">
          Oops!
        </h1>
        <div className="text-center space-y-4">
          <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl dark:text-white">
            Page Not Found
          </h3>
          <p className="max-w-[400px] text-sm md:text-base dark:text-white">
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </p>
        </div>
        <Link to="/">
          <Button
            variant="cta"
            size="full"
            className="bg-primary hover:bg-primary-dark text-white uppercase"
          >
            go to homepage
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Error;
