import { useContext, useState } from "react";

// contexts
import { ChatbotContext } from "@contexts/ChatbotContext";

// components
import ChatUI from "@src/components/layouts/chat/ChatUI";
import DepartmentBtn from "@components/buttons/DepartmentBtn";
import ItemsRenderer from "@components/common/ItemsRenderer";

const step = 4;
const currentPage = 1;

type ChatType = Readonly<{
  role: string;
  chat?: string;
  image?: string;
  video?: string;
  docs?: string;
  docsLink?: string;
  depts: {
    id: string;
    deptName: string;
    service: string;
    steps: string;
    requirements: string;
  }[];
  timeSent: string;
  link?: string;
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
  depts,
  timeSent,
  link,
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
          messageBy={role}
          img={configuration.icon}
          chat={chat}
          image={image}
          video={video}
          depts={depts}
          docs={docs}
          docsLink={docsLink}
          renderDeptsContent={renderDeptsContent}
          link={link}
          timeSent={timeSent}
          loadMore={loadMore}
          numberOfDeptsToShow={numberOfDeptsToShow}
        />
      );
    } else if (role === "user") {
      return <ChatUI messageBy={role} chat={chat} timeSent={timeSent} />;
    }
  };

  return <>{renderChat()}</>;
};

export default Chat;
