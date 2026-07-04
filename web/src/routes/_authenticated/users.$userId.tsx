import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createFileRoute, redirect, useCanGoBack, useRouter } from '@tanstack/react-router'
import { UserAvatar } from '../../components/UserAvatar';
import type { User } from '../../types';

export const Route = createFileRoute('/_authenticated/users/$userId')({
  loader: async ({ context, params }) => {
    const { token, id } = context.user
    const { userId } = params

    if (userId === id) {
      return redirect({ to: "/users/me" })
    }

    const BASE_URL = import.meta.env.VITE_API_URL;
    const options = { headers: { Authorization: `Bearer ${token}` } }

    const res = await fetch(`${BASE_URL}/users/${userId}`, options)

    if (!res.ok) {
      throw new Error("Fail to load profile")
    }

    const user = await res.json()
    return user;
  },
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const canGoBack = useCanGoBack()
  const user: User = Route.useLoaderData();

  const { username, avatar, about } = user;

  return (
    <div className="flex-1 overflow-hidden rounded-2xl border dark:border-slate-800 dark:bg-slate-900/90">
      <header className="relative flex items-center justify-center border-b border-slate-800 px-4 py-4">
        <button
          onClick={() => router.history.back()}
          disabled={!canGoBack}
          className="absolute left-4 inline-flex items-center justify-center rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Go back"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2.5} />
        </button>

        <h1 className="font-semibold text-white">About</h1>
      </header>

      <div className="px-4 py-6">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <div className="size-40 rounded-full border border-slate-700 bg-slate-950/40 shadow-xl overflow-hidden">
            <UserAvatar avatar={avatar} username={username} />
          </div>

          <p className="mt-4 text-center text-xl font-semibold">{username}</p>

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