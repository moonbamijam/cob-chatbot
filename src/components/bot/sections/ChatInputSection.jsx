import { useContext } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import EmojiPicker from "emoji-picker-react";

// contexts
import { ChatbotContext } from "../../../contexts/ChatbotContext";

// components
import { Button } from "../../ui/Button";

// icons
import { IoSend } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { MdEmojiEmotions } from "react-icons/md";
import { useState } from "react";
import { useRef } from "react";

const MessageInput = ({
  faqsRef,
  sendMessageToBot,
  sendFaqToBot,
  userMessage,
  setUserMessage,
  isFaqsMenuActive,
  setIsFaqsMenuActive,
}) => {
  const { chatbot } = useContext(ChatbotContext);
  const [faqs] = chatbot.faqs;
  const [isEmojiActive, setIsEmojiActive] = useState(false);

  const toggleFaqsMenu = () => {
    setIsFaqsMenuActive(!isFaqsMenuActive);
  };

  const toggleEmoji = () => {
    setIsEmojiActive(!isEmojiActive);
  };

  const ref = useRef(null);
  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    const cursor = ref.current.selectionStart;
    const text =
      userMessage.slice(0, cursor) +
      emojiObject.target +
      userMessage.slice(cursor);
    setUserMessage(text);
  };

  const renderFaqs = () => {
    if (!faqs.length == 0)
      return (
        <section
          id="suggested-questions"
          className={`w-full absolute bottom-0 px-4 py-3 mb-[58px] bg-white dark:bg-dm-background z-50 ${isFaqsMenuActive ? "block" : "translate-x-full opacity-0 invisible hidden"}`}
        >
          <div className="inline-grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-2 gap-2 ">
            {faqs.map((faq, id) => (
              <Button
                key={id}
                variant="outline"
                className="rounded-3xl w-full border border-primary text-xs xs:text-sm text-primary dark:text-white hover:bg-primary hover:text-white active:translate-y-1"
                onClick={() => sendFaqToBot(faq.questions[0])}
                message={faq.questions[0]}
              >
                {faq.questions[0]}
              </Button>
            ))}
          </div>
        </section>
      );
  };

  return (
    <div ref={faqsRef} className={`w-full flex justify-between items-center`}>
      {renderFaqs()}
      <form
        onSubmit={(e) => sendMessageToBot(e, userMessage)}
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
          className="relative w-full px-2 py-3 rounded-3xl flex items-center justify-center border border-surface-dark outline-primary focus-within:border-primary dark:border-transparent dark:bg-dm-surface dark:focus-within:bg-dm-surface-light cursor-text"
        >
          <ReactTextareaAutosize
            ref={ref}
            id="chat"
            name="chat"
            autoFocus
            value={userMessage}
            onChange={(e) => {
              setUserMessage(e.target.value);
              setIsFaqsMenuActive(false);
            }}
            className="max-h-[100px] w-full dark:text-white outline-none bg-transparent placeholder:text-sm sm:placeholder:text-base px-2 dark:bg-dm-surface dark:focus:bg-dm-surface-light placeholder:opacity-80 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark"
            placeholder="Type here..."
          />
          <Button
            variant="icon"
            size="icon"
            type="button"
            className="h-full p-0 [&>svg>path]:dark:text-surface-dark hover:bg-dm-surface-light"
            onClick={toggleEmoji}
          >
            <MdEmojiEmotions />
          </Button>
          <EmojiPicker
            theme="dark"
            emojiStyle="facebook"
            skinTonesDisabled
            height="50%"
            width="25em"
            style={{ position: "fixed", bottom: "15%" }}
            open={isEmojiActive}
            onEmojiClick={onEmojiClick}
            className="bottom-[20$] dark:bg-dm-surface-dark"
          />
        </label>
        <Button
          variant="icon"
          size="icon"
          className="text-primary active:translate-x-2 hover:bg-surface dark:hover:bg-dm-surface cursor-pointer"
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

export default MessageInput;
