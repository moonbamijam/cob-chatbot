import { chatbot } from "../../libs/bot-details";

const Typing = () => {
  return (
    <div className="w-full my-2 rounded-3xl flex gap-2 items-center ">
      <img
        src={chatbot.logo}
        alt="Chatbot Icon"
        width={35}
        height={35}
        className="rounded-full "
      />
      <div className="flex space-x-1 items-center">
        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Typing;
