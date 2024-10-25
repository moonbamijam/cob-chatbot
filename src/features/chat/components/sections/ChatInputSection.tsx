import { FormEvent, LegacyRef, useContext } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

// contexts
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import Button from "@components/ui/Button";

// layouts
import ItemsRenderer from "@layouts/ItemsRenderer";

// icons
import { IoSend } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

// types
import { FaqType } from "@src/shared/ts/type";

type ChatInputSectionProps = Readonly<{
  faqsRef: LegacyRef<HTMLDivElement> | null;
  sendMessageToBot: (
    event: KeyboardEvent | FormEvent<HTMLInputElement | HTMLFormElement>,
    message: string,
  ) => void;
  sendFaqToBot: (message: string) => void;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  isFaqsMenuActive: boolean;
  setIsFaqsMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}>;

const ChatInputSection = ({
  faqsRef,
  sendMessageToBot,
  sendFaqToBot,
  userMessage,
  setUserMessage,
  isFaqsMenuActive,
  setIsFaqsMenuActive,
}: ChatInputSectionProps) => {
  const chatbot = useContext(ChatbotContext);
  const { faqs } = chatbot.faqs;

  const toggleFaqsMenu = () => {
    setIsFaqsMenuActive(!isFaqsMenuActive);
  };

  const renderFaqs = () => {
    if (faqs.length)
      return (
        <section
          id="suggested-questions"
          className={`w-full max-w-[95%] absolute bottom-0 px-4 py-3 mb-[160px] rounded-3xl bg-white dark:bg-dm-surface border border-surface dark:border-dm-surface-dark z-50 ${isFaqsMenuActive ? "block opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <div className="mb-4 font-semibold">
            <h1 className="capitalize text-black/80 dark:text-white/80">
              hello there!
            </h1>
            <p className="text-black/50 dark:text-white/50">
              You can ask me about,
            </p>
          </div>

          <div className="inline-grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-2 gap-2 ">
            <ItemsRenderer
              items={faqs}
              renderItems={(faqs: FaqType, id) => (
                <Button
                  key={id}
                  variant="outline"
                  className="rounded-3xl w-full h-full border border-primary text-xs xs:text-sm text-primary dark:text-white hover:bg-primary hover:text-white active:translate-y-1"
                  onClick={() => sendFaqToBot(faqs.questions[0])}
                >
                  {faqs.questions[0]}
                </Button>
              )}
            />
          </div>
        </section>
      );
  };

  return (
    <div ref={faqsRef} className={`w-full flex justify-center items-center`}>
      {renderFaqs()}
      <form
        onSubmit={(
          e: KeyboardEvent | FormEvent<HTMLInputElement | HTMLFormElement>,
        ) => sendMessageToBot(e, userMessage)}
        className="w-full flex justify-between items-center gap-1 px-2 py-2"
      >
        <Button
          variant="icon"
          size="icon"
          className={`text-primary hover:bg-surface dark:hover:bg-dm-surface ${isFaqsMenuActive && "bg-primary [&>svg]:text-white hover:bg-primary dark:hover:bg-primary"}`}
          type="button"
          onClick={toggleFaqsMenu}
        >
          <LuMenu />
        </Button>
        <label
          htmlFor="chat"
          className="w-full px-2 py-3 rounded-3xl flex items-center border border-surface-dark outline-primary focus-within:border-primary dark:border-transparent dark:bg-dm-surface dark:focus-within:bg-dm-surface-light cursor-text"
        >
          <ReactTextareaAutosize
            id="chat"
            name="chat"
            autoFocus
            spellCheck={false}
            value={userMessage}
            onChange={(e) => {
              setUserMessage(e.target.value);
              setIsFaqsMenuActive(false);
            }}
            className="max-h-[100px] w-full dark:text-white outline-none bg-transparent placeholder:text-sm sm:placeholder:text-base px-2 dark:bg-dm-surface dark:focus:bg-dm-surface-light placeholder:opacity-80 caret-primary dark:caret-secondary scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark"
            placeholder="Type here..."
          />
        </label>
        <Button
          variant="icon"
          size="icon"
          className="text-primary active:translate-x-1 hover:bg-surface dark:hover:bg-dm-surface cursor-pointer"
          type="submit"
          onClick={() => setIsFaqsMenuActive(false)}
          disabled={!userMessage}
        >
          <IoSend />
        </Button>
      </form>
    </div>
  );
};

export default ChatInputSection;
