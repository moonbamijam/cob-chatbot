import { useContext } from "react";

// contexts
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import ChatbotTeamIcon from "@features/settings/components/about/chatbot-team/ChatbotTeamIcon";
import SettingsTitle from "@features/settings/components/SettingsTitle";
import SettingsMiniTitle from "@features/settings/components/SettingsMiniTitle";

const ChatbotTeam = () => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;

  return (
    <section className="flex flex-col gap-8">
      <SettingsTitle text="about" />
      <div className="flex flex-col gap-y-10 gap-x-6">
        <div>
          <SettingsMiniTitle text="chatbot team" />
          <section className="flex flex-col items-center gap-8 mt-12 text-black/90 dark:text-white/90">
            <h2 className="lg:text-lg text-center animate-pulse text-black/50 dark:text-white/50">
              Click the icon to know more about the people who made{" "}
              {configuration.name}!
            </h2>
            <div className="inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ChatbotTeamIcon
                to="https://www.facebook.com/SenpaiJayvee"
                src="https://avatars.githubusercontent.com/u/143238040?v=4"
                alt="Jv"
                text="SenpaiJayvee"
                role="documentation"
              />
              <ChatbotTeamIcon
                to="https://moonbamiofficial.vercel.app/"
                src="https://avatars.githubusercontent.com/u/141120384?v=4"
                alt="Jam Moonbami"
                text="moonbami"
                role="developer"
              />
              <ChatbotTeamIcon
                to="https://www.facebook.com/JirehTumbagahan"
                src="https://avatars.githubusercontent.com/u/106262567?v=4"
                alt="Jireh"
                text="ecchiko"
                role="developer"
              />
            </div>
          </section>
        </div>
      </div>
      <hr className="w-full border-surface-dark dark:border-dm-surface-light" />
    </section>
  );
};

export default ChatbotTeam;
