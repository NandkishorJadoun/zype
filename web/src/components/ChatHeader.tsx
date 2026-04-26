import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, User02FreeIcons } from "@hugeicons/core-free-icons";
import type { User } from "../types";

export const ChatHeader = ({ user }: { user: User }) => {
  return (
    <header className="dark:bg-slate-900 relative flex justify-center items-center border-b px-3 py-4 dark:border-slate-800 rounded-t-2xl">
      <Link to={"/"} className="absolute left-3 flex gap-1">
        <HugeiconsIcon icon={ArrowLeft02Icon} color="white" strokeWidth={2.5} />
      </Link>
      <Link to={`/users/${user.id}`} className="flex items-center gap-2">
        <div className="border dark:border-slate-700 w-9 h-9 rounded-full flex dark:bg-slate-900 items-center justify-center">
          <HugeiconsIcon icon={User02FreeIcons} />
        </div>
        <p className="font-semibold">{user.username}</p>
      </Link>
    </header>
  );
};
