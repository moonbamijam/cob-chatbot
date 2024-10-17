import Button from "@components/ui/Button";

const SuggestedChatButton = ({ ...props }) => {
  return (
    <Button
      variant="outline"
      size="xl"
      className="rounded-3xl w-full h-full border border-primary text-xs xs:text-sm text-primary dark:text-white hover:bg-primary hover:text-white  active:translate-y-1"
      {...props}
    />
  );
};

export default SuggestedChatButton;
