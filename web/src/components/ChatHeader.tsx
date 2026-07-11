import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import type { User } from "../types";
import { Link } from "@tanstack/react-router";
import { UserAvatar } from "./UserAvatar";

export const ChatHeader = ({ user }: { user: User }) => {
  const { id, username, avatar } = user;

  return (
    <div className="bg-surface-elevated/80 glass relative flex justify-center items-center border-b border-separator px-3 h-[52px] flex-shrink-0 rounded-t-xl">
      <Link
        to={"/"}
        className="absolute left-3 inline-flex items-center justify-center size-[32px] rounded-full text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-all duration-150"
        aria-label="Go back"
      >
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          size={18}
          strokeWidth={2.5}
        />
      </Link>
      <Link
        to="/users/$userId"
        params={{ userId: id }}
        className="flex items-center gap-2.5 min-w-0"
      >
        <div className="size-8 rounded-full bg-surface-secondary overflow-hidden flex-shrink-0">
          <UserAvatar avatar={avatar} username={username} />
        </div>
        <p className="font-semibold text-[0.9375rem] text-text-primary truncate">
          {username}
        </p>
      </Link>
    </div>
  );
};
