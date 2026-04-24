import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, User02FreeIcons } from "@hugeicons/core-free-icons";
import type { User } from "../types";

export const ChatHeader = ({
  user,
  backUrl,
}: {
  user: User;
  backUrl: string;
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 backdrop-blur-xs z-10">
      <div className="dark:bg-slate-900 relative max-w-6xl mx-auto flex justify-center items-center border h-16 px-3 dark:border-slate-800">
        <Link to={backUrl} className="absolute left-3 flex gap-1">
          <HugeiconsIcon
            icon={ArrowLeft02Icon}
            color="white"
            strokeWidth={2.5}
          />
        </Link>
        <Link to={`/users/${user.id}`} className="flex items-center gap-2">
          <div className="border dark:border-slate-700 w-9 h-9 rounded-full flex dark:bg-slate-900 items-center justify-center">
            <HugeiconsIcon icon={User02FreeIcons} />
          </div>
          <p className="font-semibold">{user.username}</p>
        </Link>
      </div>
    </header>
  );
};
