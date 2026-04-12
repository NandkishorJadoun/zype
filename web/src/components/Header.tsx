import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { User } from "@hugeicons/core-free-icons";

export const Header = () => {
  const { id } = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="flex justify-between items-center border-b px-3 dark:border-b-slate-700 fixed top-0 left-0 right-0 backdrop-blur-xs bg-slate-900/80 z-10 h-16">
      <Link className="text-2xl font-semibold" to={"/chats"}>
        Zype
      </Link>
      <Link
        to={`/users/${id}`}
        className="border dark:border-slate-700 w-9 h-9 rounded-full flex bg-slate-900 items-center justify-center"
      >
        <HugeiconsIcon icon={User} />
      </Link>
    </header>
  );
};
