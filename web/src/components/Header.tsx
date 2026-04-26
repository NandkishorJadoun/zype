import { Link, useNavigate } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { User, Logout01Icon } from "@hugeicons/core-free-icons";

export const Header = () => {
  // TODO: get id from context in loader
  const { id } = JSON.parse(localStorage.getItem("user")!);
  const navigate = useNavigate();

  return (
    <header className="px-3 py-4 flex justify-between items-center dark:border-slate-800 border dark:bg-slate-900 rounded-2xl mt-3 mx-3">
      <Link className="text-2xl font-semibold" to={"/"}>
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
