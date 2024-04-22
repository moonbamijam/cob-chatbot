import ReactTextareaAutosize from "react-textarea-autosize";

// Icons
import { IoSend } from "react-icons/io5";

const MessageInput = ({
  sendMessageToBot,
  userMessage,
  setUserMessage,
  settings,
}) => {
  return (
    <form
      onSubmit={(e) => sendMessageToBot(e, userMessage)}
      className={`${
        settings ? "-translate-x-full hidden" : ""
      } w-full flex justify-between items-center gap-2 px-4 pb-2`}
    >
      <ReactTextareaAutosize
        autoFocus
        name="chat"
        id="chat"
        value={userMessage}
        onChange={(e) => {
          setUserMessage(e.target.value);
        }}
        className="px-4 py-3 w-full rounded-3xl dark:text-white border border-gray-400 dark:border-transparent outline-none dark:bg-gray-700  dark:caret-white"
        placeholder="Type here..."
      />
      <button
        type="submit"
        disabled={!userMessage}
        className="p-4 rounded-full flex items-center justify-center active:translate-x-2 text-2xl text-blue-500 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
      >
        <IoSend />
      </button>
    </form>
  );
};

export default MessageInput;
