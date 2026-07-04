import type { User } from "../types";
import { HugeiconsIcon } from "@hugeicons/react";
import { User02FreeIcons } from "@hugeicons/core-free-icons";
import { Link } from "@tanstack/react-router";

export const UserCard = ({ user }: { user: User }) => {
  const { username, id, avatar, about } = user;

  return (
    <div className="py-3 px-2 flex items-center gap-4 has-[.active]:bg-slate-800 rounded-xl">
      <Link
        to="/users/$userId" params={{ userId: id }}
        className="border dark:border-slate-700 w-10 h-10 rounded-full flex dark:bg-slate-900 items-center justify-center"
      >
        {avatar ? (
          <img
            src={avatar}
            alt={`${username}'s profile`}
            className="size-full object-cover rounded-full"
          />
        ) : (
          <HugeiconsIcon icon={User02FreeIcons} />
        )}
      </Link>
      <Link to="/chats/user/$userId" params={{ userId: id }} className="min-w-0 flex-1">
        <p className="font-semibold">{username}</p>
        <p className="text-sm opacity-75 min-w-0 truncate">
          {about || "Nothing here… for now."}
        </p>
      </Link>
    </div>
  );
};
