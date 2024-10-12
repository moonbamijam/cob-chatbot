import { ChangeEvent, useContext } from "react";
import { chatHeadSizeList } from "../../../../../lib/settings/chatHeadSizeList.js";

// context
import { ChatContext } from "../../../../../contexts/ChatContext.tsx";

// components
import RadioButton from "../../../buttons/RadioButton.tsx";
import Grid from "../../../common/Grid.tsx";
import SettingSwitch from "../../../sections/SettingSwitch.tsx";
import SettingsMiniTitle from "../../SettingsMiniTitle.js";
import ChatHeadPreview from "../../../ui/ChatHeadPreview.jsx";
import ItemsRenderer from "../../../../common/ItemsRenderer.tsx";

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
