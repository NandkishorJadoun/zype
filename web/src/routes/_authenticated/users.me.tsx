import { createFileRoute, Link, useCanGoBack, useRouter } from '@tanstack/react-router'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { UserAvatar } from '../../components/UserAvatar';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft02Icon, Edit03Icon } from '@hugeicons/core-free-icons';
import type { User } from '../../types';

const fetchMe = async (token: string, signal: AbortSignal) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const options = { headers: { Authorization: `Bearer ${token}` }, signal }
  const res = await fetch(`${BASE_URL}/users/me`, options)
  if (!res.ok) throw new Error("Fail to load profile")
  return res.json()
}

const meQueryOptions = (token: string) =>
  queryOptions({
    queryKey: ['me'],
    queryFn: ({ signal }) => fetchMe(token, signal),
  })

export const Route = createFileRoute('/_authenticated/users/me')({
  loader: async ({ context }) => {
    const { token } = context.user
    await context.queryClient.ensureQueryData(meQueryOptions(token))
    return { token }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const canGoBack = useCanGoBack()
  const { token } = Route.useLoaderData()
  const { data } = useQuery(meQueryOptions(token))
  const { email, username, avatar, about }: User = data.user;

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

        <Link
          to="/users/me/edit"
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