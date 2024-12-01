import Button from "@/src/components/ui/Button";
import { VscRefresh } from "react-icons/vsc";

const ChatError = ({ message }: { message: string }) => {
  return (
    <Button
      variant="empty"
      className="w-full flex justify-center group"
      onClick={() => location.reload()}
    >
      <div className="flex items-center justify-center gap-2 min-w-[60%] px-4 py-3 mt-3 mb-2 text-center text-white rounded-3xl bg-red-500 capitalize">
        {message}
        <VscRefresh className=" group-hover:rotate-90" />
      </div>
    </Button>
  );
};

export default ChatError;
