import { useContext } from "react";

// context
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import MiniProfile from "@src/components/sections/MiniProfile";
import SettingsMiniTitle from "@src/components/layouts/settings/SettingsMiniTitle";
import SettingsTitle from "@src/components/layouts/settings/SettingsTitle";

type AboutProps = {
  settings: boolean;
};

const About = ({ settings }: AboutProps) => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;

  return (
    <section className="flex flex-col gap-8">
      <SettingsTitle text="about" />
      <div className="flex flex-col gap-y-10 gap-x-6">
        <div>
          <SettingsMiniTitle text={configuration.name} />
          <MiniProfile state={settings} />
        </div>
      </div>
    </section>
  );
};

export default About;
