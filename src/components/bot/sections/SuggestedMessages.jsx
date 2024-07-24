import SuggestedMessageBtn from "../buttons/SuggestedMessageBtn";

const suggestedMessages = [
  {
    displayedText: "City Hall Location",
    message: "Where can I find the City Hall of Bacoor?",
  },
  {
    displayedText: "Say Hi!",
    message: "Hi",
  },
  {
    displayedText: "Who created you?",
    message: "Who created you?",
  },
];

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
      ))}{" "}
    </section>
  );
};

export default SuggestedMessages;
