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
    <div className="border-t p-2">
      <form className="flex gap-2" onSubmit={submitHandler}>
        <textarea
          className="border flex-1 p-2"
          name="message"
          placeholder="Write Your Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-black text-white font-bold p-3">Send</button>
      </form>
    </div>
  );
};
