// import { suggestedMessages } from "../../../lib/suggestedMessages";
import SuggestedMessageBtn from "../buttons/SuggestedMessageBtn";
import Messages from "../../../../static/messages/suggested.json";

const SuggestedMessages = ({ sendMessageToBot }) => {
  return (
    <section
      id="suggested-messages"
      className="w-full flex justify-center gap-2 px-4 pt-4 mt-auto"
    >
      {Messages.list.map((message, id) => (
        <SuggestedMessageBtn
          key={id}
          onClick={(e) => sendMessageToBot(e, message.message)}
          message={message.displayedText}
        />
      ))}
    </section>
  );
};

export default SuggestedMessages;
