import { Link } from "react-router";
import type { User } from "../types";
import { HugeiconsIcon } from "@hugeicons/react";
import { User02FreeIcons } from "@hugeicons/core-free-icons";

export const UserCard = ({ user }: { user: User }) => {
  const { username, id } = user;

  // TODO: add about feature

  const about = undefined;

  return (
    <div className="border-b dark:border-b-slate-800 py-3 flex items-center gap-4">
      <Link
        to={`/users/${id}`}
        className="border dark:border-slate-700 w-10 h-10 rounded-full flex dark:bg-slate-900 items-center justify-center"
      >
        <HugeiconsIcon icon={User02FreeIcons} />
      </Link>
      <Link to={`/chats/user/${id}`}>
        <p className="font-semibold">{username}</p>
        <p className="opacity-75">{about ?? "I Love Zype"}</p>
      </Link>
    </div>
  );
};
