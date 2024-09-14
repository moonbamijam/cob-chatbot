import { useState, useEffect, useRef } from "react";
import { settingsList } from "../../../../lib/settings/settingsList";

// components
import { Button } from "../../../ui/Button";
import SettingsBtn from "../SettingsBtn";
import SettingsNavSection from "./SettingsNavSection";
import SettingsNavTitle from "./SettingsNavTitle";
import Version from "../../ui/Version";

// icons
import { LuMenu } from "react-icons/lu";

const SettingsNavBar = ({ state, handleSettingsChange, changeSetting }) => {
  const [isSideNavActive, setIsSideNavActive] = useState(false);
  const sideNavRef = useRef(null);

  const toggleSideNav = () => {
    setIsSideNavActive(!isSideNavActive);
  };

  useEffect(() => {
    const handleSideNav = (event) => {
      console.log("running");
      if (!sideNavRef.current?.contains(event.target))
        setIsSideNavActive(false);
    };
    document.addEventListener("mousedown", handleSideNav);
    return () => {
      document.removeEventListener("mousedown", handleSideNav);
    };
  }, []);

  return (
    <>
      <nav
        className={`absolute top-0 left-0 bottom-0 h-full px-4 py-10 flex flex-col items-start sm:justify-between bg-surface dark:bg-dm-surface-dark ${isSideNavActive ? "w-[50%] md:w-[20%]" : "w-[20%] sm:w-[15%] md:w-[20%]"} z-50`}
        ref={sideNavRef}
      >
        <Button
          variant="icon"
          size="icon"
          onClick={toggleSideNav}
          className={`${isSideNavActive ? "bg-primary [&>svg>line]:text-white" : "hover:bg-surface-dark dark:hover:bg-dm-surface"} [&>svg>line]:dark:text-white md:hidden mb-10`}
        >
          <LuMenu />
        </Button>
        <div className="w-full">
          <SettingsNavSection>
            <SettingsNavTitle name="chat settings" />
            {settingsList
              .filter((setting) => {
                return setting.settingType === "chat";
              })
              .map((setting) => (
                <SettingsBtn
                  key={setting.name}
                  name={setting.name}
                  checkedIf={state == setting.name}
                  onClick={() => changeSetting(setting.name)}
                  onChange={handleSettingsChange}
                  icon={<setting.icon />}
                  state={isSideNavActive}
                />
              ))}
          </SettingsNavSection>
          <SettingsNavSection>
            <SettingsNavTitle name="about" />
            {settingsList
              .filter((setting) => {
                return setting.settingType === "about";
              })
              .map((setting) => (
                <SettingsBtn
                  key={setting.name}
                  name={setting.name}
                  checkedIf={state == setting.name}
                  onClick={() => changeSetting(setting.name)}
                  onChange={handleSettingsChange}
                  icon={<setting.icon />}
                  state={isSideNavActive}
                />
              ))}
          </SettingsNavSection>
        </div>
        <Version
          className="text-xs px-2 md:px-4 text-black/60 dark:text-white/50 mt-auto"
          text={`${isSideNavActive ? "Version " : "v"}`}
        />
      </nav>
      <div className="settings-box max-w-[20%] w-full"></div>
    </>
  );
};

export default SettingsNavBar;
