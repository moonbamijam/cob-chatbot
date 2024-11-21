import { useRef, useState } from "react";
import messages from "@static/messages/suggested.json";

// components
import Button from "@components/ui/Button";

// layouts
import ItemsRenderer from "@layouts/ItemsRenderer";

// icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

type SuggestedChatSectionProps = {
  sendFaqToBot: (message: string) => void;
};

type SuggestedMessagesType = {
  displayedText: string;
  message: string;
};

const SuggestedChatSection = ({ sendFaqToBot }: SuggestedChatSectionProps) => {
  const suggestedChatsRef = useRef<HTMLDivElement | null>(null);
  const suggestedChats = suggestedChatsRef.current;
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const [isSmoothScrolling, setIsSmoothScrolling] = useState<boolean>(true);

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const itemWidth = 200;

  const handleScrollByButton = (scrollAmount: number) => {
    let newScrollPosition = scrollPosition + scrollAmount;
    if (suggestedChats) {
      // console.log("pos", newScrollPosition);
      // console.log("w", suggestedChats.scrollWidth);
      if (newScrollPosition >= suggestedChats.scrollWidth - 128)
        newScrollPosition = 0;
      else if (newScrollPosition <= 0)
        newScrollPosition = suggestedChats.scrollWidth;
      suggestedChats.scrollLeft = newScrollPosition;
    }
    setScrollPosition(newScrollPosition);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsSmoothScrolling(false);
    setIsMouseDown(true);
    if (suggestedChats) {
      setStartX(e.pageX - -suggestedChats.offsetLeft);
      setScrollLeft(suggestedChats.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    setIsSmoothScrolling(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setIsSmoothScrolling(false);
    if (!isMouseDown) return;
    e.preventDefault();
    if (suggestedChats) {
      const x = e.pageX - suggestedChats.offsetLeft;
      const scrollSpeed = (x - startX) * 2;
      suggestedChats.scrollLeft = scrollLeft - scrollSpeed;
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setIsSmoothScrolling(true);
  };

  return (
    <section
      id="suggested-chats"
      className="relative w-full max-w-[95%] flex items-center rounded-3xl border border-surface dark:border-dm-surface-dark dark:bg-dm-surface text-xs xs:text-sm sm:text-base mt-auto outline-none py-4 overflow-hidden"
    >
      <div className="w-[80px] h-full absolute -left-1 hidden xl:flex items-center bg-gradient-to-r from-white dark:from-dm-surface from-30%">
        <Button
          className="outline-none h-full border-none bg-transparent text-primary pl-4"
          onClick={() => handleScrollByButton(-itemWidth)}
        >
          <FaArrowLeft />
        </Button>
      </div>
      <div
        ref={suggestedChatsRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full h-[100px] px-10 xl:px-12 flex items-center gap-x-6 sm:gap-x-8 xl:gap-x-6 overflow-x-scroll cursor-move ${isSmoothScrolling ? "scroll-smooth" : "scroll-auto"} scrollbar-none`}
      >
        <ItemsRenderer
          items={messages.list}
          renderItems={(
            { displayedText, message }: SuggestedMessagesType,
            id: number,
          ) => (
            <Button
              key={id}
              variant="outline"
              size="xl"
              className="rounded-3xl min-w-[200px] h-full border border-primary text-xs xs:text-sm text-primary dark:text-white hover:bg-primary hover:text-white active:translate-y-1"
              onClick={() => {
                if (message != "") sendFaqToBot(message);
              }}
            >
              {displayedText}
            </Button>
          )}
        />
      </div>
      <div className="w-[80px] h-full absolute -right-1 hidden xl:flex items-center justify-end bg-gradient-to-l from-white dark:from-dm-surface from-30%">
        <Button
          className="outline-none h-full border-none bg-transparent text-primary pr-4"
          onClick={() => handleScrollByButton(itemWidth)}
        >
          <FaArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default SuggestedChatSection;
