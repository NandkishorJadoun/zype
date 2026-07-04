import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, User02FreeIcons } from "@hugeicons/core-free-icons";
import type { User } from "../types";
import { Link } from "@tanstack/react-router";

export const ChatHeader = ({ user }: { user: User }) => {
  const { id, username, avatar } = user;
  return (
    <div className="dark:bg-slate-900 relative flex justify-center items-center border-b px-3 py-4 dark:border-slate-800 rounded-t-2xl">
      <Link
        to={"/"}
        className="absolute left-4 inline-flex items-center justify-center rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
        aria-label="Go back"
      >
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          color="currentColor"
          strokeWidth={2.5}
        />
      </Link>
      <Link to="/users/$userId" params={{ userId: id }} className="flex items-center gap-2">
        <div className="border dark:border-slate-700 w-9 h-9 rounded-full flex dark:bg-slate-900 items-center justify-center">
          {avatar ? (
            <img
              className="size-full object-cover rounded-full"
              src={avatar}
              alt={`${username}'s profile`}
            />
          ) : (
            <HugeiconsIcon icon={User02FreeIcons} />
          )}
        </div>
        <p className="font-semibold">{username}</p>
      </Link>
    </div>
  );
};
