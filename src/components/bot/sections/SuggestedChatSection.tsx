import messages from "../../../../static/messages/suggested.json";

// components
import SuggestedChatButton from "../buttons/SuggestedChatButton.tsx";
import ItemsRenderer from "../../common/ItemsRenderer.tsx";
import { FormEvent } from "react";

type SuggestedChatSectionProps = {
  sendMessageToBot: (
    event: FormEvent<HTMLFormElement>,
    message: string,
  ) => void;
};

type SuggestedMessagesType = {
  id: string;
  displayedText: string;
  message: string;
};

const SuggestedChatSection = ({
  sendMessageToBot,
}: SuggestedChatSectionProps) => {
  return (
    <section
      id="suggested-chats"
      className="w-full max-w-[95%] rounded-3xl border border-surface dark:border-dm-surface-dark dark:bg-dm-surface text-xs xs:text-sm sm:text-base flex justify-around sm:justify-center xl:justify-around gap-x-2 sm:gap-x-8 xl:gap-x-2 px-4 py-2 mt-auto outline-none"
    >
      <ItemsRenderer
        items={messages.list}
        renderItems={(message: SuggestedMessagesType) => (
          <SuggestedChatButton
            key={message.id}
            onClick={(e: FormEvent<HTMLFormElement>) =>
              sendMessageToBot(e, message.message)
            }
          >
            {message.displayedText}
          </SuggestedChatButton>
        )}
      />
    </section>
  );
};

export default SuggestedChatSection;
