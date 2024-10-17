import { formatedDate } from "@utils/date";

const TimeHeader = () => {
  return (
    <>
      <div
        id="date-header"
        className="w-full relative flex gap-10 text-xs py-1 text-white font-bold uppercase"
      >
        <div id="city" className="">
          <p>bacoor</p>
        </div>
        <p id="date">{formatedDate}</p>
      </div>
    </>
  );
};

export default TimeHeader;
