import { useContext, useState } from "react";

// contexts
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import DepartmentBtn from "@features/department/components/buttons/DepartmentBtn";

// layouts
import ItemsRenderer from "@layouts/ItemsRenderer";
import ChatUI from "@features/chat/layouts/ChatUI";

// types
import { deptsType } from "@shared/ts/type";

const step = 4;
const currentPage = 1;

type ChatType = Readonly<{
  role: string;
  chat?: string;
  image?: string;
  video?: string;
  docs?: string;
  docsLink?: string;
  link?: string;
  linkMessage?: string;
  depts: deptsType;
  timestamp: string;
}>;

type DepartmentType = {
  id: string;
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
  docs,
  docsLink,
  link,
  linkMessage,
  depts,
  timestamp,
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
          renderItems={(dept: DepartmentType) => (
            <DepartmentBtn
              key={dept.id}
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
        <ChatUI
          chatBy={role}
          chat={chat}
          img={configuration.icon}
          image={image}
          video={video}
          depts={depts}
          link={link}
          linkMessage={linkMessage}
          docs={docs}
          docsLink={docsLink}
          renderDeptsContent={renderDeptsContent}
          timestamp={timestamp}
          loadMore={loadMore}
          numberOfDeptsToShow={numberOfDeptsToShow}
        />
      );
    } else if (role === "user") {
      return <ChatUI chatBy={role} chat={chat} timestamp={timestamp} />;
    }
  };

  return <>{renderChat()}</>;
};

export default Chat;
