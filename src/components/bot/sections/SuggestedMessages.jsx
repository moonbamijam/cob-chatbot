import SuggestedMessageBtn from "../buttons/SuggestedMessageBtn";
import Messages from "../../../../static/messages/suggested.json";

const SuggestedMessages = ({ sendMessageToBot }) => {
  return (
    <section
      id="suggested-messages"
      className="w-full text-xs xs:text-sm sm:text-base flex justify-around sm:justify-center xl:justify-around gap-x-2 sm:gap-x-8 xl:gap-x-2 px-4 pt-4 mt-auto outline-none"
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
