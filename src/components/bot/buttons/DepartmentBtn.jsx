import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DepartmentBtn = ({ deptName, service, steps, requirements }) => {
  const [isActive, setIsActive] = useState(false);

  const deptButton = useRef();

  const toggleButton = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleDeptButton = (event) => {
      if (!deptButton.current?.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleDeptButton);
    return () => {
      document.removeEventListener("mousedown", handleDeptButton);
    };
  }, [deptButton]);

  return (
    <div ref={deptButton} className="relative flex flex-col m-2">
      <button
        onClick={() => toggleButton()}
        className={`px-4 py-3 text-left text-white dark:bg-gray-700 cursor-pointer flex justify-between items-center gap-2 ${
          isActive
            ? "rounded-b-none rounded-t-3xl bg-gray-600 dark:bg-gray-800"
            : "rounded-3xl bg-gray-500"
        } [&>p]:hover:text-white [&>svg>path]:hover:text-white hover:bg-gray-600 dark:hover:bg-gray-800`}
      >
        <p
          className={`max-w-[250px] ${
            isActive ? "text-white" : "text-gray-300"
          }`}
        >
          {deptName}
        </p>
        <IoIosArrowDown
          className={`${isActive ? "rotate-180 text-white" : "text-gray-400"}`}
        />
      </button>
      <div>
        <div
          className={`w-full px-4 py-3 rounded-b-3xl bg-gray-500 z-10 ${
            isActive == true
              ? "block"
              : "-translate-y-[50%] rounded-3xl opacity-0 hidden"
          }`}
        >
          <div className="mb-2">
            <div className="text-white text-lg font-semibold mb-1">Here are the services we offer:</div>
            <div className="font-semibold text-white">{service}</div>
          </div>
          <div className="mb-2">
            <div className="text-white capitalize text-lg font-semibold mb-1">steps:</div>
            <p className="text-white">{steps}</p>
          </div>
          <div className="">
            <div className="text-white capitalize text-lg font-semibold mb-1">requirements:</div>
            <p className="text-white">{requirements}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentBtn;
