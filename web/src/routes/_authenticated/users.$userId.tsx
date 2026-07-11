import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createFileRoute, redirect, useCanGoBack, useRouter, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { UserAvatar } from '../../components/UserAvatar';
import type { User } from '../../types';
import { userQueryOptions } from '../../utils/users-query';

export const Route = createFileRoute('/_authenticated/users/$userId')({
  loader: async ({ context, params }) => {
    const { token, id } = context.user
    const { userId } = params

    if (userId === id) {
      throw redirect({ to: "/users/me" })
    }

    await context.queryClient.ensureQueryData(userQueryOptions(token, userId))
    return { token, userId }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const navigate = useNavigate()
  const canGoBack = useCanGoBack()
  const { token, userId } = Route.useLoaderData()
  const { data } = useQuery(userQueryOptions(token, userId))

  const { username, avatar, about }: User = data.user

  return (
    <div className="flex-1 flex flex-col bg-surface-primary rounded-xl overflow-hidden">
      <header className="bg-surface-elevated/80 glass border-b border-separator h-[52px] flex items-center justify-center px-4 flex-shrink-0 relative rounded-t-xl">
        <button
          onClick={() => router.history.back()}
          disabled={!canGoBack}
          className="absolute left-3 inline-flex items-center justify-center size-[32px] rounded-full text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-all duration-150 disabled:opacity-30"
          aria-label="Go back"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={18} strokeWidth={2.5} />
        </button>

        <h1 className="text-[0.9375rem] font-semibold text-text-primary">Profile</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="mx-auto flex max-w-sm flex-col items-center">
          <div className="size-32 rounded-full bg-surface-secondary overflow-hidden shadow-lg">
            <UserAvatar avatar={avatar} username={username} />
          </div>

          <p className="mt-4 text-center text-[1.375rem] font-semibold text-text-primary">{username}</p>

          <div className="mt-8 w-full space-y-3">
            <div className="bg-surface-secondary rounded-xl px-4 py-3.5">
              <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-text-secondary mb-1">
                Bio
              </p>
              <p className="text-[0.9375rem] text-text-primary leading-relaxed whitespace-pre-wrap">
                {about ?? "Nothing here\u2026 for now."}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate({ to: "/chats/user/$userId", params: { userId } })}
            className="mt-6 w-full bg-accent text-white text-[0.9375rem] font-semibold py-3 rounded-full active:scale-[0.97] transition-all duration-150"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};
