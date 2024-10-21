import { CSSProperties } from "react";

type SampleUserChatProps = {
  style: CSSProperties;
  chat: string;
};

const SampleUserChat = ({ style, chat }: SampleUserChatProps) => {
  return (
    <div style={style} className="user chat">
      <div className="w-full flex justify-end mt-3 mb-2">
        <div className="max-w-[80%] rounded-3xl shadow bg-primary text-white px-4 py-3 space-y-2 break-words">
          <p id="chat">{chat}</p>
          <div
            id="timeSent"
            className="w-full text-gray-300 text-xs text-right opacity-80"
          >
            {new Date().toLocaleTimeString().replace(/(.*)\D\d+/, "$1")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleUserChat;
