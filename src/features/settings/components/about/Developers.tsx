import DevIcon from "@components/icons/DevIcon";
import SettingsTitle from "@features/settings/components/SettingsTitle";
import SettingsMiniTitle from "@features/settings/components/SettingsMiniTitle";
import { useContext } from "react";
import { ChatbotContext } from "@/src/contexts/ChatbotContext";

const Developers = () => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;

  return (
    <section className="flex flex-col gap-8">
      <SettingsTitle text="about" />
      <div className="flex flex-col gap-y-10 gap-x-6">
        <div>
          <SettingsMiniTitle text="The Developers" />
          <section className="flex flex-col items-center gap-8 mt-16 text-black/90 dark:text-white/90">
            <h2 className="text-xl animate-pulse text-black/50 dark:text-white/50">
              Click the icon to know more about the developers of{" "}
              {configuration.name}!
            </h2>
            <div className="inline-grid grid-cols-2 gap-4">
              <DevIcon
                to="https://moonbamiofficial.vercel.app/"
                src="https://avatars.githubusercontent.com/u/141120384?v=4"
                alt="Jam Moonbami"
                text="moonbami"
              />
              <DevIcon
                to="https://www.facebook.com/JirehTumbagahan"
                src="https://avatars.githubusercontent.com/u/106262567?v=4"
                alt="Jireh"
                text="ecchiko"
              />
            </div>
          </section>
        </div>
      </div>
      <hr className="w-full border-surface-dark dark:border-dm-surface-light" />
    </section>
  );
};

export default Developers;
