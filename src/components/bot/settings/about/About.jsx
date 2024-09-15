import { chatbotConfig } from "../../../../lib/bot/chatbotConfig";
import MiniProfile from "../../sections/MiniProfile";
import SettingsMiniTitle from "../SettingsMiniTitle";
import SettingsTitle from "../SettingsTitle";

const About = ({ settings }) => {
  return (
    <section className="flex flex-col gap-8">
      <SettingsTitle text="about" />
      <div className="flex flex-col gap-y-10 gap-x-6">
        <div>
          <SettingsMiniTitle text={chatbotConfig.name} />
          <MiniProfile state={settings} />
        </div>
      </div>
    </section>
  );
};

export default About;
