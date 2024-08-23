import Mascot from "../../assets/gif/animated-mascot.gif";

const ChatHead = ({ state, onClick }) => {
  return (
    <>
      <button
        onClick={() => onClick()}
        id=""
        className={`fixed right-12 bottom-12 rounded-full z-[100] ${
          state ? "opacity-0 translate-y-[100%] invisible" : ""
        }`}
      >
        <img src={Mascot} alt="chat head logo" className="w-[400px]" />
      </button>
    </>
  );
};

export default ChatHead;
