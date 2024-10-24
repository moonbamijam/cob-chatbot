import { ChangeEvent, useContext } from "react";
import { chatHeadSizeList } from "@src/features/settings/constants/chat-head-size-list";

// context
import { ChatContext } from "@contexts/ChatContext";

// components
import RadioButton from "@components/buttons/RadioButton";
import SettingsMiniTitle from "@features/settings/components/SettingsMiniTitle";
import ChatHeadPreview from "@features/chat/components/previews/ChatHeadPreview";

// layouts
import Grid from "@layouts/Grid";
import ItemsRenderer from "@layouts/ItemsRenderer";
import SettingSwitch from "@features/settings/layouts/SettingSwitch";

const ChatHeadSwitch = () => {
  const chat = useContext(ChatContext);
  const { chatHeadSize, setChatHeadSize } = chat.chatHeadSize;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChatHeadSize(parseInt(event.target.value));
  };

  return (
    <SettingSwitch className="hidden xl:block">
      <SettingsMiniTitle text="chat head size" />
      <Grid>
        <ItemsRenderer
          items={chatHeadSizeList}
          renderItems={(size) => (
            <RadioButton
              key={size.value}
              name="chat-head-size"
              id={size.value.toString()}
              value={size.value}
              checkedIf={chatHeadSize == size.value}
              onChange={handleChange}
              onClick={() => chat.changeChatHeadSize(size.value)}
              displayedText={size.name}
            />
          )}
        />
      </Grid>
      <div className="flex flex-col items-center md:items-start 2xl:items-center mt-8">
        <ChatHeadPreview />
      </div>
    </SettingSwitch>
  );
};

export default ChatHeadSwitch;
