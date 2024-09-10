import { Link } from "react-router-dom";

// components
import Card from "../ui/Card";

// assets
import CityHallCloseUp from "../../../static/assets/images/default-page-card.jpg";

const PageCard = ({ img, name, comingSoon }) => {
  const renderPageCard = () => {
    if (comingSoon) {
      return (
        <Card>
          <Link
            to="/bacoor-gov"
            className="relative max-w-[400px] max-h-[150px] flex justify-center items-center bg-dm-surface-dark rounded-lg overflow-hidden group"
          >
            <img
              src={CityHallCloseUp}
              alt=""
              className="w-[400px] h-[150px] object-cover opacity-20 group-hover:opacity-30"
            />
            <h3 className="absolute opacity-100 text-white text-3xl font-helvetica-rounded-bold">
              Coming soon
            </h3>
          </Link>
        </Card>
      );
    } else {
      return (
        <Card>
          <Link
            to="/bacoor-gov"
            className="relative max-w-[400px] max-h-[150px] flex justify-center items-center bg-dm-surface-dark rounded-lg overflow-hidden group"
          >
            <img
              src={img}
              alt=""
              className="w-[400px] h-[150px] object-cover opacity-50 dark:opacity-40 group-hover:opacity-90"
            />
            <h3 className="absolute opacity-100 group-hover:opacity-0 text-white text-3xl capitalize font-helvetica-rounded-bold">
              {name}
            </h3>
          </Link>
        </Card>
      );
    }
  };

  return <>{renderPageCard()}</>;
};

export default PageCard;
