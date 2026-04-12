import { Link } from "react-router";
import type { Chat } from "../types";
import { HugeiconsIcon } from "@hugeicons/react";
import { User } from "@hugeicons/core-free-icons";

export const ChatCard = ({ chat }: { chat: Chat }) => {
  const { id } = chat;
  const user = chat.users[0];

  // TODO: add latest message in response

  const message = undefined;

  return (
    <div className="border-b border-b-slate-800 py-3 flex items-center gap-4 w-full">
      <Link
        to={`/users/${id}`}
        className="border dark:border-slate-700 w-10 h-10 rounded-full flex bg-slate-900 items-center justify-center"
      >
        <HugeiconsIcon icon={User} />
      </Link>
      <Link to={`/chats/${id}`}>
        <p className="font-semibold">{user.username}</p>
        <p className="opacity-75">{message ?? "Some Message"}</p>
      </Link>
    </div>
  );
};
