import { useContext } from "react";
import { FontContext } from "../../../contexts/FontProvider";
import { chatbotConfig } from "../../../lib/bot/chatbotConfig";
import Messages from "../../../../static/messages/suggested.json";

// icons
import { IoSend } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

// components
import ReactTextareaAutosize from "react-textarea-autosize";
import SampleBotChat from "./SampleBotChat";
import SampleUserChat from "./SampleUserChat";
import { Button } from "../../ui/Button";
import SuggestedChatButton from "../buttons/SuggestedChatButton";

const ChatPreview = ({ className }) => {
  const { font } = useContext(FontContext);
  const [fontSize] = font.size;
  const [fontFamily] = font.family;

  return (
    <>
      {/* preview for large screens */}
      <div
        className="max-w-[500px] w-full h-[700px] hidden xl:flex flex-col bg-background dark:bg-dm-background border border-surface-dark dark:border-dm-surface rounded-xl"
        style={{ fontFamily: fontFamily }}
      >
        <header className="w-full flex items-center justify-between px-4 py-4 mr-auto shadow-md dark:shadow-dm-surface-dark">
          <div className="flex items-center gap-4">
            <img
              src={chatbotConfig.logo}
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
            message={`Sometimes, changing fonts helps us to read text clearly. Especially when we have eye problems 😵`}
          />
          <SampleUserChat
            style={{ fontSize: fontSize }}
            message={`Your messages to ${chatbotConfig.name} will look like this.`}
          />
          <SampleBotChat
            style={{ fontSize: fontSize }}
            message={`Meanwhile, ${chatbotConfig.name}'s messages will look like this.`}
          />
          <SampleBotChat
            style={{ fontSize: fontSize }}
            message={`And when ${chatbotConfig.name} send a link, it will look like this, `}
            linkedMessage="Click here"
          />
        </div>
        <section className={`w-full flex justify-center gap-2 px-4 pt-2`}>
          {Messages.list.map((message, id) => (
            <SuggestedChatButton key={id}>
              {message.displayedText}
            </SuggestedChatButton>
          ))}
        </section>
        <div className="w-full flex justify-between items-center gap-1 px-2 py-2">
          <Button
            variant="icon"
            size="icon"
            className="text-primary hover:bg-surface dark:hover:bg-dm-surface"
            type="button"
          >
            <LuMenu />
          </Button>
          <label
            htmlFor="sameple-chat-preview-ls"
            className="w-full px-4 py-3 rounded-3xl flex items-center border border-surface-dark focus-within:border-primary dark:border-transparent dark:bg-dm-surface dark:focus-within:bg-dm-surface-light cursor-text"
          >
            <ReactTextareaAutosize
              name="sameple-chat-preview-ls"
              id="sameple-chat-preview-ls"
              className="max-h-[100px] w-full dark:text-white outline-none bg-transparent dark:focus:bg-dm-surface-light placeholder:opacity-80 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark"
              placeholder="Aa"
            />
          </label>
          <Button
            variant="icon"
            size="icon"
            className="text-primary active:translate-x-2 hover:bg-surface dark:hover:bg-dm-surface cursor-pointer"
            type="submit"
          >
            <IoSend />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatPreview;
