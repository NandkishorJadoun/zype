import { Link } from "react-router";
import type { User } from "../types";

export const UserCard = ({ user }: { user: User }) => {
  const { username, about, id } = user;
  const profile = username[0].toUpperCase();

  return (
    <Link
      to={`/chats/user/${id}`}
      className="border p-2 m-1 flex items-center gap-4"
    >
      <div className="border w-8 h-8 rounded-[50%] flex items-center justify-center">
        {profile}
      </div>
      <div>
        <p className="font-semibold">{username}</p>
        <p className="text-zinc-600">{about ?? "I Love Zype"}</p>
      </div>
    </Link>
  );
};
