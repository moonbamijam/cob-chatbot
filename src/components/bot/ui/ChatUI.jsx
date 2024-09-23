import { useState, useEffect, useRef } from "react";

import SampleVideo from "../../../../static/assets/videos/zoning.mp4";
import SampleImage from "../../../../static/assets/images/default-page-card.jpg";

// components
import { Button } from "../../ui/Button";
import ScreenDim from "./ScreenDim";

// icons
import { CgClose } from "react-icons/cg";

const ChatUI = ({
  messageBy,
  img,
  children,
  timeSent,
  fontSize,
  video,
  image,
}) => {
  const [imagePreview, setImagePreview] = useState(false);
  const imagePreviewRef = useRef(null);

  const toggleImagePreview = () => {
    setImagePreview(!imagePreview);
  };

  useEffect(() => {
    const handleImagePreview = (event) => {
      if (!imagePreviewRef.current?.contains(event.target))
        setImagePreview(false);
    };
    document.addEventListener("mousedown", handleImagePreview);
    return () => {
      document.removeEventListener("mousedown", handleImagePreview);
    };
  }, [imagePreview]);

  const renderChatUI = () => {
    switch (messageBy) {
      case "bot":
        return (
          <div className={`${messageBy} message`}>
            <div className="w-full h-max relative flex items-center gap-2 mt-3 mb-2">
              <img
                src={img}
                alt="Chatbot Icon"
                width={35}
                height={35}
                className="rounded-full aspect-square object-cover select-none"
              />
              {image && (
                <img
                  src={SampleImage}
                  alt=""
                  className="w-max max-w-[50%] h-max rounded-xl outline-primary object-contain cursor-pointer hover:opacity-70"
                  onClick={toggleImagePreview}
                />
              )}
              {video && (
                <video
                  width="200"
                  height="240"
                  controls
                  poster=""
                  muted
                  className="w-max max-w-[50%] h-max rounded-xl outline-primary object-contain cursor-pointer"
                >
                  <source src={SampleVideo} type="video/mp4" />
                </video>
              )}
              <div className="max-w-[80%] rounded-3xl shadow bg-surface dark:bg-dm-surface px-4 py-3 space-y-2 break-words">
                <div
                  id="message"
                  style={{ fontSize: fontSize }}
                  className="relative dark:text-white whitespace-pre-line"
                >
                  {children}
                </div>
                <div
                  id="timeSent"
                  className="text-gray-500 dark:text-gray-300 text-xs text-right opacity-80 z-[9]"
                >
                  {timeSent}
                </div>
              </div>
            </div>
          </div>
        );
      case "user":
        return (
          <div className={`${messageBy} message`}>
            <div
              className="w-full flex justify-end
            mt-3 mb-2"
            >
              <div className="max-w-[80%] rounded-3xl shadow bg-primary text-white px-4 py-3 space-y-2 break-words">
                <div
                  id="message"
                  style={{ fontSize: fontSize }}
                  className="relative dark:text-white whitespace-pre-line"
                >
                  {children}
                </div>
                <div
                  id="timeSent"
                  className="w-full text-gray-300 text-xs text-right opacity-80 z-[9]"
                >
                  {timeSent}
                </div>
              </div>
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
              src={SampleImage}
              alt=""
              className="max-w-[90%] max-h-[90%]"
              ref={imagePreviewRef}
            />
          </div>
          <ScreenDim className="bg-black z-50 backdrop-blur opacity-70" />
        </>
      )}
      {renderChatUI()}
    </>
  );
};

export default ChatUI;
