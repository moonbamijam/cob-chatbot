import { MouseEventHandler } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

type DropdownType = Partial<
  Readonly<{
    text: string;
    dropdownOne: boolean;
    dropdownTwo: boolean;
    dropdownThree: boolean;
    dropdownFour: boolean;
    dropdownFive: boolean;
    toggle: MouseEventHandler<HTMLDivElement>;
    href: string;
  }>
>;

const Dropdown = ({
  text,
  dropdownOne,
  dropdownTwo,
  dropdownThree,
  dropdownFour,
  dropdownFive,
  toggle,
  href,
}: DropdownType) => {
  return (
    <div
      onMouseEnter={toggle}
      onMouseLeave={toggle}
      className="relative flex items-center gap-1 py-5 cursor-pointer"
    >
      {href ? (
        <a href={href} className="capitalize font-bold w-full h-full">
          {text}
        </a>
      ) : (
        <p className="capitalize font-bold">{text}</p>
      )}
      <span className="[&>svg>path]:font-semibold">
        <RiArrowDownSLine />
      </span>
      {dropdownOne && (
        <DropdownAnchorList>
          <DropdownAnchor
            href={"https://bacoor.gov.ph/uncategorized/vision-mission/"}
            text={"mission & vision"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/historical-background-of-bacoor/"}
            text={"historical background of bacoor"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/videos/352nd-bakood-festival/"}
            text={"352nd bacoor festival"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/ang-himno-ng-bacoor/"}
            text={"ang himno ng bacoor"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/category/tourism/"}
            text={"tourism"}
          />
        </DropdownAnchorList>
      )}
      {dropdownTwo && (
        <DropdownAnchorList>
          <DropdownAnchor href={"#"} text={"citizen charter"} />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/city-officials/"}
            text={"city officials"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/city-and-units-heads/"}
            text={"city department and unit heads"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/barangay-officials-2023/"}
            text={"barangay officials"}
          />
          <DropdownAnchor
            href={"http://bacoorcitysp.com/legislative-tracker/"}
            text={"city ordinances"}
          />
          <DropdownAnchor href={"#"} text={"DILG Full Disclosure Policy"} />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/clup-2015-2024/"}
            text={"CLUP (2015-2024)"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/job-vacancies/"}
            text={"job vacancies"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/privacy-policy/"}
            text={"privacy policy"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/iso-quality-management-system/"}
            text={"ISO (Quality Management System)"}
          />
        </DropdownAnchorList>
      )}
      {dropdownThree && (
        <DropdownAnchorList>
          <DropdownAnchor
            href={"https://bacoor.gov.ph/category/awards/"}
            text={"Awards / Accomplishment"}
          />
          <DropdownAnchor
            href={"https://www.facebook.com/MayorStrikeRevilla"}
            text={"Official Facebook"}
          />
          <DropdownAnchor
            href={"https://www.strikesaserbisyo.com/"}
            text={"Strike Sa Serbisyo App Website"}
          />
          <DropdownAnchor href={"#"} text={"Mayor Strike - SCAN ME"} />
        </DropdownAnchorList>
      )}
      {dropdownFour && (
        <DropdownAnchorList>
          <DropdownAnchor
            href={"https://boss.bacoor.gov.ph/"}
            text={"Online Application for Business & Building Permits"}
          />
          <DropdownAnchor
            href={"https://boss.bacoor.gov.ph/"}
            text={
              "Online Appointment for Real Property Tax, Business & Building Permits"
            }
          />
          <DropdownAnchor
            href={"https://boss.bacoor.gov.ph/"}
            text={"Solidarity Route Online Registration System"}
          />
          <DropdownAnchor
            href={"http://bacoorcitysp.com/legislative-tracker/"}
            text={"city ordinances"}
          />
        </DropdownAnchorList>
      )}
      {dropdownFive && (
        <DropdownAnchorList>
          <DropdownAnchor
            href={"https://bacoor.gov.ph/bacoor-hospital-directory/"}
            text={"hospital directory"}
          />
          <DropdownAnchor
            href={
              "https://bacoor.gov.ph/local-directory-of-bacoor-government-center/"
            }
            text={"Local Gov't Offices"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/city-and-units-heads/"}
            text={"City Department and Unit Heads"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/barangay-hall-directory/"}
            text={"barangay hall"}
          />
          <DropdownAnchor
            href={"https://bacoor.gov.ph/national-government-agenciesoffices/"}
            text={"National Government Agencies/Offices"}
          />
        </DropdownAnchorList>
      )}
    </div>
  );
};

const DropdownAnchorList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[250px] absolute top-[60px] -left-6 flex flex-col text-xs text-black bg-white py-2 px-6">
      {children}
    </div>
  );
};

type DropdownAnchorType = {
  href: string;
  text: string;
};

const DropdownAnchor = ({ href, text }: DropdownAnchorType) => {
  return (
    <a
      href={href}
      className="capitalize py-3 text-xs font-bold hover:text-[#ff0202]"
    >
      {text}
    </a>
  );
};

export default Dropdown;
