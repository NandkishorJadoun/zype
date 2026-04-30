import type { Chat } from "../types";
import { useLoaderData, useFetcher } from "react-router";
import { ChatHeader } from "../components/ChatHeader";
import { HugeiconsIcon } from "@hugeicons/react";
import { SentIcon } from "@hugeicons/core-free-icons";

const ChatPage = () => {
  const fetcher = useFetcher();
  const chat: Chat = useLoaderData();
  const user = chat.users[0];
  const { messages } = chat;

  const key = messages.at(-1)?.id || "key";

  return (
    <div className="flex-1 flex flex-col dark:bg-slate-900/90 border dark:border-slate-800 rounded-2xl">
      <ChatHeader user={user} />
      <main className="p-2 flex-1 flex flex-col-reverse gap-1.5 overflow-y-auto">
        {[...messages].reverse().map((msg) => {
          const options = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          } as const;

          const time = new Date(msg.created_at).toLocaleTimeString(
            "en-US",
            options,
          );

          const senderStyles = "self-end bg-blue-600 rounded-bl-xl";

          const receiverStyles =
            "self-start bg-slate-800 border border-slate-700 rounded-br-xl";

          return (
            <div
              key={msg.id}
              className={`${msg.userId === user.id ? "self-start" : "self-end"}`}
            >
              <p
                className={`rounded-tl-xl rounded-tr-xl p-2 break-all ${msg.userId === user.id ? receiverStyles : senderStyles}`}
              >
                {msg.data}
              </p>
              <p
                className={`opacity-75 text-sm mt-0.5 ${msg.userId === user.id ? "text-start" : "text-end"}`}
              >
                {time}
              </p>
            </div>
          );
        })}
      </main>
      <fetcher.Form
        method="POST"
        className=" border p-1 mx-3 mb-2 dark:border-slate-700 dark:bg-slate-950/15 backdrop-blur-xs flex gap-1 rounded-4xl h-16 items-center"
      >
        <textarea
          key={key}
          rows={1}
          className="focus:outline-0 focus:outline-blue-600 px-3 py-3 flex-1 resize-none rounded-4xl"
          name="message"
          placeholder="Write Your Message..."
        />
        <button
          type="submit"
          className="bg-blue-600 font-bold p-3.5 rounded-full active:scale-[0.95] transition-all duration-200 shadow-lg shadow-blue-900/20"
        >
          <HugeiconsIcon icon={SentIcon} strokeWidth={2.5} />
        </button>
      </fetcher.Form>
    </div>
  );
};

export default ChatPage;
