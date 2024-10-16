import { ChangeEvent, useContext } from "react";
import { chatHeadSizeList } from "@lib/settings/chatHeadSizeList";

// context
import { ChatContext } from "@contexts/ChatContext";

// components
import RadioButton from "@components/bot/buttons/RadioButton";
import Grid from "@components/bot/common/Grid";
import SettingSwitch from "@components/bot/sections/SettingSwitch";
import SettingsMiniTitle from "@components/bot/settings/SettingsMiniTitle";
import ChatHeadPreview from "@components/bot/ui/ChatHeadPreview";
import ItemsRenderer from "@components/common/ItemsRenderer";

const ChatHeadSwitch = () => {
  const chat = useContext(ChatContext);
  const { chatHeadSize, setChatHeadSize } = chat.chatHeadSize;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChatHeadSize(parseInt(event.target.value));
  };

  return (
    <SettingSwitch>
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
