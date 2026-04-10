import { Link } from "react-router";
import type { Chat } from "../types";

export const ChatCard = ({ chat }: { chat: Chat }) => {
  const { id } = chat;
  const user = chat.users[0];
  const profile = user.username[0].toUpperCase();

  // TODO: add latest message in response

  const message = undefined;

  return (
    <Link
      to={`/chats/${id}`}
      className="border p-2 m-1 flex items-center gap-4"
    >
      <div className="border w-8 h-8 rounded-[50%] flex items-center justify-center">
        {profile}
      </div>
      <div>
        <p className="font-semibold">{user.username}</p>
        <p className="text-zinc-600">{message ?? "Some Message"}</p>
      </div>
    </Link>
  );
};
