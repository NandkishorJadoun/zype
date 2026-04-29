import { useLoaderData, Link, useNavigate } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, Edit03Icon } from "@hugeicons/core-free-icons";
import type { User } from "../types";
import { UserAvatar } from "../components/UserAvatar";

const CurrentUserProfilePage = () => {
  const navigate = useNavigate();
  const user: User = useLoaderData();

  const { email, username, avatar, about } = user;

  return (
    <div className="flex-1 overflow-hidden rounded-2xl border dark:border-slate-800 dark:bg-slate-900/90">
      <header className="relative flex items-center justify-center border-b border-slate-800 px-4 py-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 inline-flex items-center justify-center rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Go back"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2.5} />
        </button>

        <h1 className="font-semibold text-white">About</h1>

        <Link
          to={"/users/me/edit"}
          className="absolute right-4 items-center justify-center rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Edit profile"
        >
          <HugeiconsIcon icon={Edit03Icon} strokeWidth={2} />
        </Link>
      </header>
      <div className="px-4 py-6">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <div className="size-40 rounded-full border border-slate-700 bg-slate-950/40 shadow-xl overflow-hidden">
            <UserAvatar avatar={avatar} username={username} />
          </div>

          <p className="mt-4 text-center text-xl font-semibold">{username}</p>

          <div className="mt-6 w-full rounded-2xl border dark:border-slate-700 dark:bg-slate-950/10 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Email
            </p>
            <p className="whitespace-pre-wrap  leading-relaxed">{email}</p>
          </div>
          <div className="mt-6 w-full rounded-2xl border dark:border-slate-700 dark:bg-slate-950/10 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Bio
            </p>
            <p className="whitespace-pre-wrap  leading-relaxed">
              {about ?? "Nothing here… for now."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserProfilePage;
