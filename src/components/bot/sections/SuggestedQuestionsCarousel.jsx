import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ArrowBtn from "../buttons/ArrowBtn";

const SuggestedQuestionsCarousel = ({ children: faqs, state }) => {
  const [current, setCurrent] = useState(0);

  const previous = () => {
    setCurrent((current) => (current == 0 ? faqs.length - 1 : current - 1));
  };

  const next = () => {
    setCurrent((current) => (current == faqs.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="relative flex items-center mx-2 overflow-hidden py-2">
      <ArrowBtn
        onClick={previous}
        className={
          "left-0 bg-gradient-to-r from-white dark:from-gray-800 from-70%"
        }
        icon={<FaArrowLeft />}
      />
      <div
        className={`min-h-[74px] flex items-center whitespace-pre-line ml-10 ${
          state && "space-x-4"
        }`}
        style={{ transform: `translateX(-${current * 20}%)` }}
      >
        {faqs}
      </div>
      <ArrowBtn
        onClick={next}
        className={
          "right-0 bg-gradient-to-l from-white dark:from-gray-800 from-70%"
        }
        icon={<FaArrowRight />}
      />
    </section>
  );
};

export default SuggestedQuestionsCarousel;
