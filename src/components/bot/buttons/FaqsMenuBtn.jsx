import { LuMenu } from "react-icons/lu";
import Button from "../ui/Button";

const FaqsMenuBtn = ({ isFaqsMenuActive, setIsFaqsMenuActive }) => {
  const toggleFaqsMenu = () => {
    setIsFaqsMenuActive(!isFaqsMenuActive);
  };

  return (
    <Button onClick={toggleFaqsMenu} type="button" state={isFaqsMenuActive}>
      <LuMenu />
    </Button>
  );
};

export default FaqsMenuBtn;
