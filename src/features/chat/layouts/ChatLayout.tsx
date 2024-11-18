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
    fullTimestamp: string;
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
  depts,
  renderDeptsContent,
  timestamp,
  fullTimestamp,
  loadMore,
  numberOfDeptsToShow,
}: ChatLayoutProps) => {
  const [imagePreview, setImagePreview] = useState(false);
  const imagePreviewRef = useRef<HTMLImageElement>(null);
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);
  const [isFullTimestampShowing, setIsFullTimestampShowing] =
    useState<boolean>(false);

  const toggleImagePreview = () => {
    setImagePreview(!imagePreview);
  };

  const handleImageLoad = () => {
    setIsFileLoaded(true);
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
          <div className={`${chatBy} chat flex flex-col`}>
            <div className="w-full h-max relative flex items-center gap-2 mt-3 mb-2">
              <img
                src={img}
                alt="Chatbot Icon"
                width={35}
                height={35}
                className="rounded-full aspect-square object-cover select-none"
              />
              {(chat || link || file || fileLink || depts) && (
                <div className="max-w-[70%]">
                  {chat && (
                    <ChatBubble
                      timestamp={timestamp}
                      toggleFullTimestamp={() =>
                        setIsFullTimestampShowing(!isFullTimestampShowing)
                      }
                      className={`${isFullTimestampShowing ? "bg-surface-dark/50 dark:bg-dm-surface-light" : "bg-surface dark:bg-dm-surface hover:bg-surface-dark/50 hover:dark:bg-dm-surface-light"} cursor-pointer`}
                    >
                      <div className="cursor-text whitespace-pre-wrap">
                        {chat}
                      </div>
                    </ChatBubble>
                  )}
                  {link && (
                    <ChatBubble
                      timestamp={timestamp}
                      toggleFullTimestamp={() =>
                        setIsFullTimestampShowing(!isFullTimestampShowing)
                      }
                      className={`${isFullTimestampShowing ? "bg-surface-dark/50 dark:bg-dm-surface-light" : "bg-surface dark:bg-dm-surface hover:bg-surface-dark/50 hover:dark:bg-dm-surface-light"} cursor-pointer`}
                    >
                      <div
                        className="cursor-text whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: link }}
                      />
                    </ChatBubble>
                  )}
                  {file && fileLink && (
                    <Link to={fileLink} target="_blank" className="group">
                      <ChatBubble
                        timestamp={timestamp}
                        className="bg-surface dark:bg-dm-surface hover:bg-surface-dark/50 hover:dark:bg-dm-surface-light cursor-pointer"
                      >
                        <div className="flex items-center gap-2 font-semibold text-primary dark:text-secondary">
                          <span className="text-xl">{renderFileType()}</span>
                          {file}
                        </div>
                      </ChatBubble>
                    </Link>
                  )}
                  {depts && renderDeptsContent && numberOfDeptsToShow && (
                    <ChatBubble
                      timestamp={timestamp}
                      toggleFullTimestamp={() =>
                        setIsFullTimestampShowing(!isFullTimestampShowing)
                      }
                      className="bg-surface-dark/50 dark:bg-dm-surface cursor-pointer"
                    >
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
                </div>
              )}
              {image && (
                <div
                  className={`${isFileLoaded ? "w-max h-max" : "w-full h-[400px] bg-surface-dark/50 dark:bg-dm-surface-light animate-pulse aspect-square"} max-w-[70%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[70%] cursor-pointer hover:opacity-70 rounded-xl overflow-hidden`}
                  onClick={toggleImagePreview}
                >
                  <img
                    src={image}
                    alt=""
                    className="rounded-xl"
                    onLoad={handleImageLoad}
                  />
                </div>
              )}
              {video && (
                <video
                  controls
                  muted
                  className="w-max max-w-[50%] sm:max-w-[40%] md:max-w-[35%] lg:max-w-[30%] xl:max-w-[50%] max-h-max rounded-xl outline-primary object-contain cursor-pointer"
                >
                  <source src={video} type="video/mp4" />
                </video>
              )}
            </div>
            <span
              className={`${isFullTimestampShowing ? "h-max mt-1" : "h-0 opacity-0"} text-xs ml-12 text-black/50 dark:text-white/50`}
            >
              {fullTimestamp}
            </span>
          </div>
        );
      case "user":
        return (
          <div className={`${chatBy} chat flex flex-col items-end`}>
            <div className="w-full flex justify-end mt-3 mb-2">
              <ChatBubble
                timestamp={timestamp}
                role="user"
                className={`max-w-[70%] ${isFullTimestampShowing ? "bg-primary-dark dark:bg-primary-light" : "bg-primary hover:bg-primary-dark dark:hover:bg-primary-light"} cursor-pointer text-white`}
                toggleFullTimestamp={() =>
                  setIsFullTimestampShowing(!isFullTimestampShowing)
                }
              >
                <span className="cursor-text whitespace-pre-line">{chat}</span>
              </ChatBubble>
            </div>
            <span
              className={`${isFullTimestampShowing ? "h-max mt-1" : "h-0 opacity-0"} text-xs mr-1 text-black/50 dark:text-white/50`}
            >
              {fullTimestamp}
            </span>
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
