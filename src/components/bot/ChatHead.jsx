import Mascot from "../../assets/animated-mascot.gif";
import { IoClose } from "react-icons/io5";

const ChatHead = ({ state, onClick }) => {
  return (
    <>
      <button
        onClick={() => onClick()}
        id=""
        className={`fixed right-12 bottom-12 rounded-full p-3 text-3xl lg:text-4xl text-white z-[100] ${
          state ? "opacity-0 translate-y-[100%] invisible" : ""
        }`}
      >
        <img src={Mascot} alt="" className="w-[250px]" />
      </button>
    </>
  );
};

export default ChatHead;
