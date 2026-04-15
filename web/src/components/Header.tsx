import { Link, useNavigate } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { User, Logout01Icon } from "@hugeicons/core-free-icons";

export const Header = () => {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center border-b px-3 dark:border-b-slate-700 fixed top-0 left-0 right-0 backdrop-blur-xs dark:bg-slate-900/80 z-10 h-16">
      <Link className="text-2xl font-semibold" to={"/chats"}>
        Zype
      </Link>
      <div className="flex gap-2">
        <Link
          to={`/users/${id}`}
          className="border dark:border-slate-700 w-9 h-9 rounded-full flex dark:bg-slate-900 items-center justify-center"
        >
          <HugeiconsIcon icon={User} />
        </Link>

        <button
          className="border dark:border-slate-700 w-9 h-9 rounded-full flex dark:bg-slate-900 items-center justify-center"
          onClick={() => {
            const keysToRemove = ["user", "token"];
            keysToRemove.forEach((key) => localStorage.removeItem(key));
            return navigate("/auth");
          }}
        >
          <HugeiconsIcon icon={Logout01Icon} />
        </button>
      </div>
    </header>
  );
};
