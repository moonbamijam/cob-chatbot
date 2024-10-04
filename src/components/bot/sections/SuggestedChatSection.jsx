// components
import Messages from "../../../../static/messages/suggested.json";
import SuggestedChatButton from "../buttons/SuggestedChatButton";

const SuggestedChatSection = ({ sendMessageToBot }) => {
  return (
    <section
      id="suggested-chats"
      className="w-full max-w-[95%] rounded-3xl border border-surface dark:border-dm-surface-dark dark:bg-dm-surface text-xs xs:text-sm sm:text-base flex justify-around sm:justify-center xl:justify-around gap-x-2 sm:gap-x-8 xl:gap-x-2 px-4 py-2 mt-auto outline-none"
    >
      {Messages.list.map((message, id) => (
        <SuggestedChatButton
          key={id}
          onClick={(e) => sendMessageToBot(e, message.message)}
        >
          {message.displayedText}
        </SuggestedChatButton>
      ))}
    </section>
  );
};

export default SuggestedChatSection;
