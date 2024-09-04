import { useContext } from "react";
import { FontContext } from "../../../contexts/FontProvider";
import { chatbot } from "../../../lib/bot/chatbot";
import Messages from "../../../../static/messages/suggested.json";

// icons
import { IoSend } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

// components
import ReactTextareaAutosize from "react-textarea-autosize";
import SuggestedMessageBtn from "../buttons/SuggestedMessageBtn";
import SampleBotChat from "./SampleBotChat";
import SampleUserChat from "./SampleUserChat";
import Button from "./Button";

const ChatPreview = () => {
  const { font } = useContext(FontContext);
  const [fontSize] = font.size;
  const [fontFamily] = font.family;

  return (
    <>
      <div
        id="message-box"
        className="w-full sm:max-w-[80%] h-full xl:hidden flex flex-col bg-background dark:bg-dm-background xl:rounded-xl overflow-hidden"
        style={{
          fontFamily: fontFamily,
        }}
      >
        <header
          id="sample-chat-header"
          className="w-full flex items-center justify-between px-4 py-4 mr-auto"
        >
          <div className="flex items-center gap-4">
            <img
              src={chatbot.logo}
              alt=""
              width={45}
              height={45}
              className="rounded-full"
            />
            <h3 className="text-2xl capitalize font-semibold dark:text-white">
              preview
            </h3>
          </div>
        </header>
        <div className="w-full max-h-[612px] h-full px-4 py-6 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface">
          <SampleUserChat
            style={{ fontSize: fontSize }}
            message={`Sometimes, changing font sizes helps us to read text more clearly. Especially when we have eye problems 😵`}
          />
          <SampleUserChat
            style={{ fontSize: fontSize }}
            message={`You'll see the messages you send to ${chatbot.name} in this size.`}
          />
          <SampleBotChat
            style={{ fontSize: fontSize }}
            message={`Meanwhile, ${chatbot.name}'s messages will look like this.`}
          />
          <SampleBotChat
            style={{ fontSize: fontSize }}
            message={`And when ${chatbot.name} send a link message, it will look like this, `}
            linkedMessage={"Click here to download"}
          />
        </div>
        <section
          id="suggested-messages"
          className={`w-full flex justify-center gap-2 px-4 pt-2`}
        >
          {Messages.list.map((message, id) => (
            <SuggestedMessageBtn key={id} message={message.displayedText} />
          ))}
        </section>
        <div className="w-full flex justify-between items-center gap-1 px-2 py-2">
          <Button type="button">
            <LuMenu />
          </Button>
          <label
            htmlFor="sameple-chat"
            className="w-full px-4 py-3 rounded-3xl flex items-center border border-surface-dark focus-within:border-primary dark:border-transparent dark:bg-dm-surface dark:focus-within:bg-dm-surface-light cursor-text"
          >
            <ReactTextareaAutosize
              name="sameple-chat"
              id="sameple-chat"
              className="max-h-[100px] w-full dark:text-white outline-none bg-transparent dark:focus:bg-dm-surface-light placeholder:opacity-80 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark"
              placeholder="Aa"
            />
          </label>
          <Button>
            <IoSend />
          </Button>
        </div>
      </div>

      <div
        className="max-w-[500px] w-full h-[700px] hidden xl:flex flex-col bg-background dark:bg-dm-background border border-surface-dark dark:border-dm-surface rounded-xl"
        style={{ fontFamily: fontFamily }}
      >
        <header
          id="sample-chat-header"
          className="w-full flex items-center justify-between px-4 py-4 mr-auto shadow-md dark:shadow-dm-surface-dark"
        >
          <div className="flex items-center gap-4">
            <img
              src={chatbot.logo}
              alt=""
              width={45}
              height={45}
              className="rounded-full"
            />
            <h3 className="text-2xl capitalize font-semibold dark:text-white">
              preview
            </h3>
          </div>
        </header>
        <div className="w-full max-h-[612px] h-full px-4 py-6 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface">
          <SampleUserChat
            style={{ fontSize: fontSize }}
            message={`Sometimes, changing font sizes helps us to read text more clearly. Especially when we have eye problems 😵`}
          />
          <SampleUserChat
            style={{ fontSize: fontSize }}
            message={`You'll see the messages you send to ${chatbot.name} in this size.`}
          />
          <SampleBotChat
            style={{ fontSize: fontSize }}
            message={`Meanwhile, ${chatbot.name}'s messages will look like this.`}
          />
          <SampleBotChat
            style={{ fontSize: fontSize }}
            message={`And when ${chatbot.name} send a link message, it will look like this, `}
            linkedMessage={"Click here to download"}
          />
        </div>
        <section
          id="suggested-messages"
          className={`w-full flex justify-center gap-2 px-4 pt-2`}
        >
          {Messages.list.map((message, id) => (
            <SuggestedMessageBtn key={id} message={message.displayedText} />
          ))}
        </section>
        <div className="w-full flex justify-between items-center gap-1 px-2 py-2">
          <Button type="button">
            <LuMenu />
          </Button>
          <label
            htmlFor="sameple-chat"
            className="w-full px-4 py-3 rounded-3xl flex items-center border border-surface-dark focus-within:border-primary dark:border-transparent dark:bg-dm-surface dark:focus-within:bg-dm-surface-light cursor-text"
          >
            <ReactTextareaAutosize
              name="sameple-chat"
              id="sameple-chat"
              className="max-h-[100px] w-full dark:text-white outline-none bg-transparent dark:focus:bg-dm-surface-light placeholder:opacity-80 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark"
              placeholder="Aa"
            />
          </label>
          <Button>
            <IoSend />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatPreview;
