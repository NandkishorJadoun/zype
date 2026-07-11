import type { User } from "../types";
import { Link } from "@tanstack/react-router";
import { UserAvatar } from "./UserAvatar";

export const UserCard = ({ user }: { user: User }) => {
  const { username, id, about, avatar } = user;

  return (
    <div className="rounded-xl hover:bg-surface-secondary transition-colors duration-150">
      <div className="py-2.5 px-3 flex items-center gap-3">
        <Link
          to="/users/$userId" params={{ userId: id }}
          className="size-10 rounded-full overflow-hidden flex-shrink-0 bg-surface-secondary"
        >
          <UserAvatar avatar={avatar} username={username} />
        </Link>
        <Link to="/chats/user/$userId" params={{ userId: id }} className="min-w-0 flex-1">
          <p className="font-semibold text-[0.9375rem] text-text-primary">{username}</p>
          <p className="text-[0.8125rem] text-text-tertiary truncate mt-0.5">
            {about || "Nothing here\u2026 for now."}
          </p>
        </Link>
      </div>
    </div>
  );
};
