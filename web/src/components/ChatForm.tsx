import { HugeiconsIcon } from "@hugeicons/react";
import { SentIcon } from "@hugeicons/core-free-icons";

type ChatFormProps = {
  message: string;
  setMessage: (value: string) => void;
  submitHandler: (e: React.SubmitEvent) => Promise<void>;
};

export const ChatForm = ({
  message,
  setMessage,
  submitHandler,
}: ChatFormProps) => {
  return (
    <div className="fixed bottom-2 left-0 right-0">
      <div className="max-w-6xl mx-auto px-3">
        <form
          className=" border p-1 dark:border-slate-700 dark:bg-slate-900 backdrop-blur-xs flex gap-1 rounded-4xl h-16 items-center shadow-2xl shadow-slate-950"
          onSubmit={submitHandler}
        >
          <textarea
            rows={1}
            className="focus:outline-0 focus:outline-blue-600 px-3 py-3 flex-1 resize-none rounded-4xl"
            name="message"
            placeholder="Write Your Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 font-bold p-3.5 rounded-full active:scale-[0.95] transition-all duration-200 shadow-lg shadow-blue-900/20"
          >
            <HugeiconsIcon icon={SentIcon} strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </div>
  );
};
