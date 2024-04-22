// Components
import SuggestedQuestionBtn from "../buttons/SuggestedQuestionBtn";
import SuggestedQuestionsCarousel from "./SuggestedQuestionsCarousel";

const SuggestedQuestions = ({
  faqsWrapper,
  settings,
  isLargeScreen,
  faqs,
  sendFaqToBot,
}) => {
  return (
    <section
      ref={faqsWrapper}
      id="suggested-questions"
      className={`${settings ? "-translate-x-full hidden" : ""}`}
    >
      <SuggestedQuestionsCarousel state={isLargeScreen}>
        {faqs.map((faq, id) => (
          <SuggestedQuestionBtn
            key={id}
            onClick={() => sendFaqToBot(faq.questions[0])}
            question={faq.questions[0]}
          />
        ))}
      </SuggestedQuestionsCarousel>
    </section>
  );
};

export default SuggestedQuestions;
