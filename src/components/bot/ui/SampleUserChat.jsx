import { chatbot } from "../../../lib/bot-details";

const SampleUserChat = ({ style }) => {
  return (
    <div style={style} className="user message">
      <div className="w-full flex justify-end mt-3 mb-2">
        <div className="max-w-[80%] rounded-3xl bg-highlight text-white px-4 py-3 break-words">
          <p id="message">
            You'll see the messages you send to {chatbot.name} in this size.
          </p>
          <div
            id="timeSent"
            className="w-full text-gray-300 text-xs text-right"
          >
            {new Date().toLocaleTimeString().replace(/(.*)\D\d+/, "$1")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleUserChat;
