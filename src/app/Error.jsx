import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      please provide a better 404 error page
      <Link to="/" className="underline">
        go back here
      </Link>
    </div>
  );
};

export default Error;
