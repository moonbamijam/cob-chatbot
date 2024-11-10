import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type DepartmentBtnProps = Readonly<{
  deptName: string;
  service: string;
  steps: string;
  requirements: string;
}>;

const DepartmentBtn = ({ deptName, service }: DepartmentBtnProps) => {
  const [isActive, setIsActive] = useState(false);

  const toggleButton = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="relative flex flex-col m-2">
      <button
        onClick={() => toggleButton()}
        className={`px-4 py-3 text-left text-white cursor-pointer flex justify-between items-center gap-2 ${
          isActive
            ? "rounded-b-none rounded-t-3xl bg-primary"
            : "rounded-3xl bg-surface-dark dark:bg-dm-surface-light"
        } [&>p]:hover:text-white [&>svg>path]:hover:text-white hover:bg-primary dark:hover:bg-primary z-20`}
      >
        <p className={`max-w-[250px] text-white`}>{deptName}</p>
        <IoIosArrowDown
          className={`${isActive ? "rotate-180 text-white" : "text-gray-400"}`}
        />
      </button>
      <div
        className={`w-full rounded-b-3xl z-10 overflow-hidden ${
          isActive == true
            ? "translate-y-0 bg-primary max-h-[1000px]"
            : "-translate-y-[15%] rounded-3xl opacity-0 max-h-0 bg-surface-dark dark:bg-dm-surface-light"
        }`}
      >
        <div className="px-4 py-3">
          <div className="mb-2">
            <div className="text-white text-lg font-semibold mb-1">
              Here are the services we offer:
            </div>
            <div className="text-white">{service}</div>
          </div>
          {/* <div className="mb-2">
            <div className="text-white capitalize text-lg font-semibold mb-1">
              steps:
            </div>
            <p className="text-white">{steps}</p>
          </div>
          <div className="">
            <div className="text-white capitalize text-lg font-semibold mb-1">
              requirements:
            </div>
            <p className="text-white">{requirements}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DepartmentBtn;
