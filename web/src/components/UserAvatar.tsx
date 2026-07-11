export const UserAvatar = ({
  avatar,
  username,
  className = "",
}: {
  avatar: string | undefined;
  username: string;
  className?: string;
}) => {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={`${username}'s profile`}
        className={`size-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`size-full flex items-center justify-center bg-accent/20 ${className}`}>
      <span className="text-accent font-semibold text-[1.25rem] select-none">
        {username.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
