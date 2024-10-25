import { useContext } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import Messages from "@static/messages/suggested.json";

// contexts
import { FontContext } from "@contexts/FontContext";
import { ChatbotContext } from "@contexts/ChatbotContext";

// icons
import { IoSend } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

// components
import Button from "@components/ui/Button";
import SampleBotChat from "@features/chat/components/SampleBotChat";
import SampleUserChat from "@features/chat/components/SampleUserChat";
import SuggestedChatButton from "@features/chat/components/buttons/SuggestedChatButton";

const ChatPreview = () => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;
  const font = useContext(FontContext);
  const { fontSize } = font.size;
  const { fontFamily } = font.family;

  return (
    <div
      className="max-w-[500px] w-full h-[700px] hidden md:flex flex-col items-center bg-background dark:bg-dm-background border border-surface-dark dark:border-dm-surface rounded-xl"
      style={{ fontFamily: fontFamily }}
    >
      <header className="w-full flex items-center justify-between px-4 py-4 mr-auto shadow-md dark:shadow-dm-surface-dark">
        <div className="flex items-center gap-4">
          <img
            src={configuration.icon}
            alt=""
            width={45}
            height={45}
            className="rounded-full sm:w-[45px] sm:h-[45px] aspect-square object-cover select-none"
          />
          <h3 className="text-2xl capitalize font-semibold dark:text-white">
            preview
          </h3>
        </div>
      </header>
      <div className="w-full max-h-[612px] h-full px-4 py-6 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface">
        <SampleUserChat
          style={{ fontSize: fontSize }}
          chat={`Sometimes, changing fonts helps us to read text clearly. Especially when we have eye problems 😵`}
        />
        <SampleUserChat
          style={{ fontSize: fontSize }}
          chat={`Your messages to ${configuration.name} will look like this.`}
        />
        <SampleBotChat
          style={{ fontSize: fontSize }}
          chat={`Meanwhile, ${configuration.name}'s messages will look like this.`}
        />
        <SampleBotChat
          style={{ fontSize: fontSize }}
          chat={`And when ${configuration.name} send a link`}
        />
        <SampleBotChat
          style={{ fontSize: fontSize }}
          linkedChat="It will look like this"
        />
      </div>
      <section className="w-full max-w-[95%] rounded-3xl border border-surface dark:border-dm-surface-dark dark:bg-dm-surface text-xs xs:text-sm sm:text-base flex justify-around sm:justify-center xl:justify-around gap-x-2 sm:gap-x-8 xl:gap-x-2 px-4 py-2 mt-auto outline-none">
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
            className="max-h-[100px] w-full dark:text-white outline-none bg-transparent dark:focus:bg-dm-surface-light placeholder:text-sm sm:placeholder:text-base placeholder:opacity-80 caret-primary dark:caret-secondary scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-dark dark:scrollbar-thumb-dm-surface-dark"
            placeholder="The fonts only apply to chat"
          />
        </label>
        <Button
          variant="icon"
          size="icon"
          className="text-primary active:translate-x-1 hover:bg-surface dark:hover:bg-dm-surface cursor-pointer"
          type="submit"
        >
          <IoSend />
        </Button>
      </div>
    </div>
  );
};

export default ChatPreview;
