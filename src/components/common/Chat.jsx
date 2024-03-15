import { RiRobot2Fill } from "react-icons/ri";

const Chat = ({ id, isBot, message }) => {
  return (
    <>
      {isBot ? (
        <div className="w-full relative flex items-center gap-2 mr-auto">
          <span id="chatbot-icon" className="text-2xl">
            <RiRobot2Fill />
          </span>
          <p className="max-w-[80%] rounded-3xl bg-gray-500 text-white px-4 py-3 my-2 break-words">
            {message}
          </p>
        </div>
      ) : (
        <div className="w-full flex justify-end">
          <p
            className="max-w-[80%] rounded-3xl bg-dummyhighlight
            text-white px-4 py-3 my-2 break-words"
          >
            {message}
          </p>
        </div>
      )}
    </>
  );
};

export default Chat;
