import { useContext } from "react";
import Mascot from "../../assets/gif/animated-mascot.gif";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "./ui/Loading";

const ChatHead = ({ state, onClick }) => {
  const { auth } = useContext(AuthContext);
  const [isSignedIn] = auth.user;

  return (
    <>
      {isSignedIn ? (
        <button
          onClick={() => onClick()}
          id=""
          className={`fixed right-12 bottom-12 rounded-full z-[100] ${
            state ? "opacity-0 translate-y-[100%] invisible" : ""
          }`}
        >
          <img src={Mascot} alt="chat head logo" className="w-[400px]" />
        </button>
      ) : (
        <div className="fixed bottom-[10%] right-[20%] lg:right-[10%] z-[100] [&>div>svg>path]:text-primary">
          <Loading />
        </div>
      )}
    </>
  );
};

export default ChatHead;
