import { useContext, useState } from "react";

// contexts
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import DepartmentBtn from "@features/department/components/buttons/DepartmentBtn";

// layouts
import ItemsRenderer from "@layouts/ItemsRenderer";
import ChatLayout from "@/src/features/chat/layouts/ChatLayout";

// types
import { deptsType } from "@shared/ts/type";

const step = 4;
const currentPage = 1;

type ChatType = Readonly<{
  role: string;
  chat?: string;
  image?: string;
  video?: string;
  file?: string;
  fileLink?: string;
  fileType?: string;
  link?: string;
  linkMessage?: string;
  depts: deptsType;
  timestamp: string;
  fullTimestamp: string;
}>;

type DepartmentType = {
  deptName: string;
  service: string;
  steps: string;
  requirements: string;
};

const Chat = ({
  role,
  chat,
  image,
  video,
  file,
  fileLink,
  fileType,
  link,
  linkMessage,
  depts,
  timestamp,
  fullTimestamp,
}: ChatType) => {
  const chatbot = useContext(ChatbotContext);
  const { configuration } = chatbot.configuration;
  const [numberOfDeptsToShow, setNumberOfDeptsToShow] = useState(4);

  const indexOfLastDept: number = currentPage * numberOfDeptsToShow;
  const indexOfFirstDept: number = indexOfLastDept - numberOfDeptsToShow;
  const currentDeptsToShow: DepartmentType[] = depts?.slice(
    indexOfFirstDept,
    indexOfLastDept,
  );

  const loadMore = () => {
    setNumberOfDeptsToShow(numberOfDeptsToShow + step);
  };

  const renderDeptsContent = () => {
    if (depts)
      return (
        <ItemsRenderer
          items={currentDeptsToShow}
          renderItems={(dept: DepartmentType, id: number) => (
            <DepartmentBtn
              key={id}
              deptName={dept.deptName}
              service={dept.service}
              steps={dept.steps}
              requirements={dept.requirements}
            />
          )}
        />
      );
  };

  const renderChat = () => {
    if (role === "bot") {
      return (
        <ChatLayout
          chatBy={role}
          chat={chat}
          img={configuration.icon}
          image={image}
          video={video}
          file={file}
          fileLink={fileLink}
          fileType={fileType}
          link={link}
          linkMessage={linkMessage}
          depts={depts}
          renderDeptsContent={renderDeptsContent}
          timestamp={timestamp}
          fullTimestamp={fullTimestamp}
          loadMore={loadMore}
          numberOfDeptsToShow={numberOfDeptsToShow}
        />
      );
    } else if (role === "user") {
      return (
        <ChatLayout
          chatBy={role}
          chat={chat}
          timestamp={timestamp}
          fullTimestamp={fullTimestamp}
        />
      );
    }
  };

  return <>{renderChat()}</>;
};

export default Chat;
