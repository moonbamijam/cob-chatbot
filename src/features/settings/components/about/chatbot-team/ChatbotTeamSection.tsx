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
            <div className="inline-grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* <ChatbotTeamIcon
                to="https://www.facebook.com/SenpaiJayvee"
                src="https://scontent.fmnl35-1.fna.fbcdn.net/v/t39.30808-6/463404479_2296134370742303_8927057865529969935_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEJ9qBDiAECa_jgYlPwV6u1Vbz8H0c3pdRVvPwfRzel1PRJptSUoQpUEMqNCYAWjn8e1quq_sQ4Lk8jctG3hxSD&_nc_ohc=qGuCkcAOKJ0Q7kNvgHLWKWB&_nc_zt=23&_nc_ht=scontent.fmnl35-1.fna&_nc_gid=AxunH63k0N4GrAhpPwPQx4Y&oh=00_AYBNxmyeQjyzbed64AZjUTjnVePMWq1Ybq82_UnyBzY25A&oe=674E4ED8"
                alt="Jv"
                text="SenpaiJayvee"
                role="documentation"
              /> */}
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
