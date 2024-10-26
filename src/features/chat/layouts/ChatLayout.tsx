import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// components
import Button from "@components/ui/Button";
import ImageDimmer from "@components/ImageDimmer";
import ChatBubble from "@features/chat/components/ChatBubble";

// types
import { deptsType } from "@shared/ts/type";

// icons
import { CgClose } from "react-icons/cg";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { SiGoogledocs } from "react-icons/si";
import { BsFiletypeDoc } from "react-icons/bs";
import { BsFiletypeDocx } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { BsFiletypeHtml } from "react-icons/bs";
import { BsFiletypeXls } from "react-icons/bs";
import { BsFiletypeXlsx } from "react-icons/bs";
import { BsFiletypePpt } from "react-icons/bs";
import { BsFiletypePptx } from "react-icons/bs";
import { BsFiletypeTxt } from "react-icons/bs";
import { BsFileEarmarkZip } from "react-icons/bs";

type ChatLayoutProps = Partial<
  Readonly<{
    chatBy: string;
    chat: string;
    img: string;
    video: string;
    image: string;
    file: string;
    fileLink: string;
    fileType: string;
    link: string;
    linkMessage: string;
    depts: deptsType;
    renderDeptsContent: () => JSX.Element | undefined;
    children: React.ReactNode;
    timestamp: string;
    fontSize: number;
    loadMore: () => void;
    numberOfDeptsToShow: number;
  }>
>;

const ChatLayout = ({
  chatBy,
  chat,
  img,
  video,
  image,
  file,
  fileLink,
  fileType,
  link,
  linkMessage,
  depts,
  renderDeptsContent,
  timestamp,
  loadMore,
  numberOfDeptsToShow,
}: ChatLayoutProps) => {
  const [imagePreview, setImagePreview] = useState(false);
  const imagePreviewRef = useRef<HTMLImageElement>(null);
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);

  const toggleImagePreview = () => {
    setImagePreview(!imagePreview);
  };

  const renderFileType = () => {
    switch (fileType) {
      case "doc":
        return <BsFiletypeDoc />;
      case "docx":
        return <BsFiletypeDocx />;
      case "pdf":
        return <BsFiletypePdf />;
      case "html":
        return <BsFiletypeHtml />;
      case "xls":
        return <BsFiletypeXls />;
      case "xlsx":
        return <BsFiletypeXlsx />;
      case "ppt":
        return <BsFiletypePpt />;
      case "pptx":
        return <BsFiletypePptx />;
      case "txt":
        return <BsFiletypeTxt />;
      case "zip":
        return <BsFileEarmarkZip />;
      default:
        return <SiGoogledocs />;
    }
  };

  useEffect(() => {
    const handleImagePreview = ({ target }: MouseEvent) => {
      if (!imagePreviewRef.current?.contains(target as Node))
        setImagePreview(false);
    };
    document.addEventListener("mousedown", handleImagePreview);
    return () => {
      document.removeEventListener("mousedown", handleImagePreview);
    };
  }, [imagePreview]);

  const renderChatLayout = () => {
    switch (chatBy) {
      case "bot":
        return (
          <div className={`${chatBy} message`}>
            <div className="w-full h-max relative flex items-center gap-2 mt-3 mb-2">
              <img
                src={img}
                alt="Chatbot Icon"
                width={35}
                height={35}
                className="rounded-full aspect-square object-cover select-none"
              />
              <div className="flex flex-col gap-4 max-w-[80%]">
                {chat && <ChatBubble timestamp={timestamp}>{chat}</ChatBubble>}
                {depts && renderDeptsContent && numberOfDeptsToShow && (
                  <ChatBubble timestamp={timestamp}>
                    {renderDeptsContent()}
                    <button
                      onClick={loadMore}
                      className={`w-full absolute -bottom-1 bg-gradient-to-t from-surface dark:from-dm-surface from-15% h-[100px] z-30 backdrop-blur-xs  ${
                        depts?.length <= numberOfDeptsToShow
                          ? "hidden"
                          : "block"
                      } hover:backdrop-blur-0 [&>p]:hover:opacity-15`}
                    >
                      <p className="flex flex-col items-center justify-center gap-1 font-semibold text-primary dark:text-secondary drop-shadow-lg animate-bounce text-base">
                        Click here to show more
                        <BsArrowDownCircleFill />
                      </p>
                    </button>
                  </ChatBubble>
                )}
                {link && (
                  <Link to={link} target="_blank" className="group">
                    <ChatBubble
                      timestamp={timestamp}
                      className="group-hover:bg-surface-dark/50 dark:group-hover:bg-dm-surface-light/70"
                    >
                      <div className="flex items-center gap-2 font-semibold text-primary dark:text-secondary">
                        <FiExternalLink className="text-xl" />
                        {linkMessage}
                      </div>
                    </ChatBubble>
                  </Link>
                )}
                {image && (
                  <img
                    src={image}
                    alt=""
                    className={`${isFileLoaded ? "w-max h-max" : "w-full h-[400px]"} rounded-xl outline-primary cursor-pointer hover:opacity-70`}
                    onLoad={() => setIsFileLoaded(true)}
                    onClick={toggleImagePreview}
                  />
                )}
                {video && (
                  <video
                    controls
                    muted
                    className={`${isFileLoaded ? "w-max h-max" : "w-full h-[200px]"} rounded-xl outline-primary object-contain cursor-pointer`}
                    onLoad={() => setIsFileLoaded(true)}
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                )}
                {file && fileLink && (
                  <Link to={fileLink} target="_blank" className="group">
                    <ChatBubble
                      timestamp={timestamp}
                      className="group-hover:bg-surface-dark/50 dark:group-hover:bg-dm-surface-light/70"
                    >
                      <div className="flex items-center gap-2 font-semibold text-primary dark:text-secondary">
                        <span className="text-xl">{renderFileType()}</span>
                        {file}
                      </div>
                    </ChatBubble>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      case "user":
        return (
          <div className={`${chatBy} message`}>
            <div className="w-full flex justify-end mt-3 mb-2">
              <ChatBubble
                timestamp={timestamp}
                role="user"
                className="max-w-[80%] bg-primary text-white"
              >
                {chat}
              </ChatBubble>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {imagePreview && (
        <>
          <Button
            variant="icon"
            size="icon"
            className="fixed top-10 right-10 z-[100] text-white bg-error hover:bg-error/80 [&>svg>path]:hover:text-white"
            onClick={toggleImagePreview}
          >
            <CgClose />
          </Button>
          <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-screen h-screen flex justify-center items-center p-[4vw] z-[90]">
            <img
              src={image}
              alt=""
              className="w-max max-w-[90%] h-max max-h-full"
              ref={imagePreviewRef}
            />
          </div>
          <ImageDimmer image={image} />
        </>
      )}
      {renderChatLayout()}
    </>
  );
};

export default ChatLayout;
