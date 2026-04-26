import { useLoaderData, Navigate, Form } from "react-router";
import type { User, Chat } from "../types";
import { ChatHeader } from "../components/ChatHeader";
import { HugeiconsIcon } from "@hugeicons/react";
import { SentIcon, SmilePlusIcon } from "@hugeicons/core-free-icons";

const UserPage = () => {
  const { user, chat }: { user: User; chat: Chat | null } = useLoaderData();

  if (chat) {
    return <Navigate to={`/chats/${chat.id}`} />;
  }

  const { username, id } = user;

  return (
    <div className="flex-1 flex flex-col dark:bg-slate-900/90 border dark:border-slate-800 rounded-2xl">
      <ChatHeader user={{ username, id }} />
      <main className="p-2 flex-1 flex items-center justify-center gap-1.5 overflow-y-auto">
        <div className="max-w-3xs w-full p-6 text-center bg-slate-800/50 border dark:border-slate-700 rounded-2xl shadow-2xl">
          <HugeiconsIcon
            icon={SmilePlusIcon}
            strokeWidth={1.5}
            size={40}
            className="mx-auto mb-4"
          />
          <h3 className="font-medium text-lg mb-1">Start the conversation</h3>
          <p className="text-slate-400 text-sm">
            Send a friendly message to your friend to get things moving.
          </p>
        </div>
      </main>
      <Form
        method="POST"
        className=" border p-1 mx-3 mb-2 dark:border-slate-700 dark:bg-slate-950/15 backdrop-blur-xs flex gap-1 rounded-4xl h-16 items-center"
      >
        <textarea
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
      </Form>
    </div>
  );
};

export default UserPage;
