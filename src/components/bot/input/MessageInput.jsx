import ReactTextareaAutosize from "react-textarea-autosize";

// Components
import Button from "../ui/Button";

// Icons
import { IoSend } from "react-icons/io5";
import FaqsMenuBtn from "../buttons/FaqsMenuBtn";
import { chatbot } from "../../../lib/bot-details";
import SuggestedQuestionBtn from "../buttons/SuggestedQuestionBtn";

const MessageInput = ({
  faqsRef,
  faqs,
  sendMessageToBot,
  sendFaqToBot,
  userMessage,
  setUserMessage,
  settings,
  isFaqsMenuActive,
  setIsFaqsMenuActive,
}) => {
  const renderFaqs = () => {
    if (!faqs.length == 0)
      return (
        <section
          id="suggested-questions"
          className={`w-full absolute bottom-0 px-4 py-3 mb-[58px] bg-white dark:bg-dm-background z-50 ${
            settings ? "-translate-x-full hidden" : ""
          } ${isFaqsMenuActive ? "" : "translate-x-full opacity-0 "}`}
        >
          <p className="mb-4 font-semibold text-lg dark:text-white">
            Ask {chatbot.name}:
          </p>
          <div className="flex flex-col items-center gap-2 ">
            {faqs.map((faq, id) => (
              <SuggestedQuestionBtn
                key={id}
                onClick={() => sendFaqToBot(faq.questions[0])}
                question={faq.questions[0]}
              />
            ))}
          </div>
        </section>
      );
  };

  return (
    <div
      ref={faqsRef}
      className={`${
        settings ? "-translate-x-full hidden" : ""
      } w-full flex justify-between items-center`}
    >
      {renderFaqs()}
      <form
        onSubmit={(e) => sendMessageToBot(e, userMessage)}
        className="w-full flex justify-between items-center gap-1 px-2 py-2"
      >
        <FaqsMenuBtn
          isFaqsMenuActive={isFaqsMenuActive}
          setIsFaqsMenuActive={setIsFaqsMenuActive}
        />
        <ReactTextareaAutosize
          autoFocus
          name="chat"
          id="chat"
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
            setIsFaqsMenuActive(false);
          }}
          className="px-4 py-3 w-full rounded-3xl dark:text-white border border-surface-dark focus:border-primary dark:border-transparent outline-none dark:bg-dm-surface dark:focus:bg-dm-surface-light dark:caret-white placeholder:opacity-80"
          placeholder="Type here..."
        />
        <Button
          onClick={() => setIsFaqsMenuActive(false)}
          type={"submit"}
          disabled={!userMessage}
        >
          <IoSend />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
