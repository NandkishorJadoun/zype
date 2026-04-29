import { HugeiconsIcon } from "@hugeicons/react";
import { User02Icon } from "@hugeicons/core-free-icons";

export const UserAvatar = ({
  avatar,
  username,
}: {
  avatar: string | undefined;
  username: string;
}) => {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={`${username}'s profile`}
        className="size-full object-cover rounded-full"
      />
    );
  }

  return (
    <div className="flex size-full items-center justify-center">
      <HugeiconsIcon
        icon={User02Icon}
        color="white"
        strokeWidth={0.5}
        className="size-24 opacity-90"
      />
    </div>
  );
};
