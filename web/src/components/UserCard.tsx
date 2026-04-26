import { Link, NavLink } from "react-router";
import type { User } from "../types";
import { HugeiconsIcon } from "@hugeicons/react";
import { User02FreeIcons } from "@hugeicons/core-free-icons";

export const UserCard = ({ user }: { user: User }) => {
  const { username, id } = user;
  const about = user.about || "Nothing here… for now.";

  return (
    <div className="py-3 px-2 flex items-center gap-4 has-[.active]:bg-slate-800 rounded-xl">
      <Link
        to={`/users/${id}`}
        className="border dark:border-slate-700 w-10 h-10 rounded-full flex dark:bg-slate-900 items-center justify-center"
      >
        <HugeiconsIcon icon={User02FreeIcons} />
      </Link>
      <NavLink to={`/chats/user/${id}`} className="min-w-0 flex-1">
        <p className="font-semibold">{username}</p>
        <p className="text-sm opacity-75 min-w-0 truncate">{about}</p>
      </NavLink>
    </div>
  );
};
