import { suggestedMessages } from "../../../lib/suggestedMessages";
import SuggestedMessageBtn from "../buttons/SuggestedMessageBtn";

const SuggestedMessages = ({ sendMessageToBot }) => {
  return (
    <section
      id="suggested-messages"
      className={`w-full flex justify-center gap-2 px-4 pt-2`}
    >
      {suggestedMessages.map((suggestedMessage, id) => (
        <SuggestedMessageBtn
          key={id}
          onClick={(e) => sendMessageToBot(e, suggestedMessage.message)}
          message={suggestedMessage.displayedText}
        />
      ))}
    </section>
  );
};

export default SuggestedMessages;
