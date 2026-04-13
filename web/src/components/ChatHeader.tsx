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
    <header className="flex justify-center items-center border-b px-3 dark:border-b-slate-700 fixed top-0 left-0 right-0 backdrop-blur-xs dark:bg-slate-950/80 z-10 h-16">
      <Link to={backUrl} className="absolute right-[90%] flex gap-1">
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
