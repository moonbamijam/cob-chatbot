import { HiInformationCircle } from "react-icons/hi";

// components
import HighlightTitle from "@components/pages/city-hall/ui/HighlightTitle";
import BacoorCityHall from "@assets/images/bacoor-city-hall.png";

const ArticleRight = () => {
  return (
    <article id="right" className="min-w-[340px] border-l border-gray-300 ">
      <div
        id="about-bacoor"
        className="flex flex-col gap-5 items-center px-5 pt-5 pb-10"
      >
        <HighlightTitle text={"about bacoor"} />
        <img src={BacoorCityHall} alt="" width={300} height={100} />
        <p className="text-sm text-justify">
          The City Government of Bacoor is the gateway to the province of
          Cavite. Bacoor is the first capital of the Revolutionary Government
          under General Emilio Aguinaldo. A historical landmark in our
          forebears' quest for Philippine Independence was the hard-fought
          Battle of Zapote Bridge on February 17, 1897. “Gargano” was the
          revolutionary name given to Bacoor.
        </p>
        <a
          href="http://bacoor.gov.ph/historical-background-of-bacoor/"
          className="px-5 py-2 bg-[#1a94d5] rounded text-sm text-white capitalize flex items-center gap-1 "
        >
          <HiInformationCircle />
          history of bacoor
        </a>
        <div id="mission-vision" className="text-sm">
          <div>
            <h1 className="capitalize text-center text-xl pb-5">mission</h1>
            <p className="text-center">
              To institute good governance, promote culture, trade and
              investment in the City, through modern technology towards a safe
              and sound environment.
            </p>
          </div>
          <div>
            <h1 className="capitalize text-center text-xl pb-5">vision</h1>
            <p className="text-center t">
              City of Bacoor: A model first class city, home of resilient,
              empowered, environment-friendly citizens, proud of their rich
              history and culture ably led by people-centered public servants
              united and guided by the rule of law, love of country and of God.
            </p>
          </div>
        </div>
      </div>
      {/*  */}
      <div id="announcements" className="flex flex-col bg-black text-white p-5">
        <HighlightTitle text={"announcement"} />
        <div className="pt-5">
          <h3 className="font-semibold mb-1">
            Memorandum Order No. 10 Series of 2024
          </h3>
          <p className="text-xs text-gray-300">March 25, 2024</p>
        </div>
        <div className="pt-5">
          <h3 className="font-semibold mb-1">Advisory: Heavy Traffic</h3>
          <p className="text-xs text-gray-300">March 18, 2024</p>
        </div>
        <div className="pt-5">
          <h3 className="font-semibold mb-1">
            SPECIAL (NON-WORKING) HOLIDAY in the province of Cavite through
            Proclamation No. 492
          </h3>
          <p className="text-xs text-gray-300">March 14, 2024</p>
        </div>
      </div>
      {/*  */}
      <div id="city-bulletin" className="flex flex-col p-5">
        <HighlightTitle text={"city bulletin"} />
        <div className="pt-5">
          <h3 className="font-semibold mb-1">Annual Procurement Plan 2024</h3>
          <p className="text-xs">January 31, 2024</p>
        </div>
        <div className="pt-5">
          <h3 className="font-semibold mb-1">ANNUAL BUDGET 2024</h3>
          <p className="text-xs">December 6, 2023</p>
        </div>
        <div className="pt-5">
          <h3 className="font-semibold mb-1">
            Public-Private Partnership Selection Committee Invitation for
            Comparative Proposals
          </h3>
          <p className="text-xs">November 7, 2023</p>
        </div>
        <div className="pt-5">
          <h3 className="font-semibold mb-1">
            CERTIFICATION OF BARANGAY MERGER
          </h3>
          <p className="text-xs">September 15, 2023</p>
        </div>
      </div>
      {/*  */}
      <div id="announcements" className="flex flex-col bg-black text-white p-5">
        <HighlightTitle text={"DILG Full Disclosure Policy"} />
        <div className="pt-5">
          <h3 className="font-semibold mb-1">
            DILG Full Disclosure Policy 2024
          </h3>
          <p className="text-xs text-gray-300">January 3, 2024</p>
        </div>
        <div className="pt-5">
          <h3 className="font-semibold mb-1">
            DILG Full Disclosure Policy 2023
          </h3>
          <p className="text-xs text-gray-300">December 19, 2022</p>
        </div>
        <div className="pt-5">
          <h3 className="font-semibold mb-1">
            DILG Full Disclosure Policy 2022
          </h3>
          <p className="text-xs text-gray-300">January 4, 2022</p>
        </div>
        <div className="pt-5">
          <h3 className="font-semibold mb-1">
            DILG Full Disclosure Policy 2021
          </h3>
          <p className="text-xs text-gray-300">January 7, 2021</p>
        </div>
        <div className="pt-5">
          <h3 className="font-semibold mb-1">
            DILG Full Disclosure Policy 2020
          </h3>
          <p className="text-xs text-gray-300">January 7, 2020</p>
        </div>
      </div>
    </article>
  );
};

export default ArticleRight;
