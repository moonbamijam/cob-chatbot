import { useState, useEffect, useRef, useContext, ChangeEvent } from "react";
import { settingsList } from "@constants/settings/settings-list";

// context
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import Button from "@components/ui/Button";
import SettingsBtn from "@src/components/layouts/settings/SettingsBtn";
import SettingsNavSection from "@src/components/layouts/settings/nav/SettingsNavSection";
import SettingsNavTitle from "@src/components/layouts/settings/nav/SettingsNavTitle";
import Version from "@src/components/layouts/Version";

// icons
import { LuMenu } from "react-icons/lu";
import { FaRobot } from "react-icons/fa6";

type SettingsNavBarProps = {
  state?: string;
  handleSettingsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  changeSetting: (setting: string) => void;
};

const SettingsNavBar = ({
  state,
  handleSettingsChange,
  changeSetting,
}: SettingsNavBarProps) => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;
  const [isSideNavActive, setIsSideNavActive] = useState(false);
  const sideNavRef = useRef<HTMLElement | null>(null);

  const toggleSideNav = () => {
    setIsSideNavActive(!isSideNavActive);
  };

  useEffect(() => {
    const handleSideNav = ({ target }: MouseEvent) => {
      if (!sideNavRef.current?.contains(target as Node))
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
            <SettingsBtn
              name={configuration.name}
              checkedIf={state == configuration.name}
              onClick={() => changeSetting(configuration.name)}
              onChange={handleSettingsChange}
              icon={<FaRobot />}
              state={isSideNavActive}
            />
          </SettingsNavSection>
        </div>
        <Version
          className="text-xs px-2 md:px-4 text-black/60 dark:text-white/50 mt-auto"
          text={`${isSideNavActive ? "Version " : "v"}`}
        />
      </nav>
    </>
  );
};

export default SettingsNavBar;
