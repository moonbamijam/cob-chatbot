import Mascot from "../../assets/animated-mascot.gif";
import { IoClose } from "react-icons/io5";

const ChatHead = ({ state, onClick }) => {
  return (
    <>
      <button
        onClick={() => onClick()}
        id=""
        className="fixed right-8 bottom-8 lg:right-12 lg:bottom-12 rounded-full p-3 text-3xl lg:text-4xl text-white z-[100] "
      >
        {state ? (
          <div className="flex justify-evenly bg-highlight rounded-full p-3">
            <IoClose />
          </div>
        ) : (
          <>
            <img src={Mascot} alt="" className="w-[150px] " />
          </>
        )}
      </button>
    </>
  );
};

export default ChatHead;
