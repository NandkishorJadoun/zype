import { createFileRoute, Link, Outlet, redirect, useLocation, useNavigate } from '@tanstack/react-router'
import { UserCard } from '../components/UserCard';
import { ChatCard } from '../components/ChatCard';
import type { Chat, User } from '../types';
import { useState } from 'react';
import { useAuth } from "../context/auth";
import { useQuery } from '@tanstack/react-query';
import { indexQueryOptions } from '../utils/index-query';
import { SocketProvider } from '../context/socket';
import { HugeiconsIcon } from '@hugeicons/react';
import { User02Icon } from '@hugeicons/core-free-icons';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated || !context.auth.user) {
      throw redirect({
        to: '/auth',
      })
    }
    return {
      user: context.auth.user,
    }
  },
  loader: async ({ context }) => {
    const { user, queryClient } = context
    const { token } = user
    await queryClient.ensureQueryData(indexQueryOptions(token))
    return { token }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const { token }: { token: string } = Route.useLoaderData();
  const { data } = useQuery(indexQueryOptions(token))

  const navigate = useNavigate()
  const { logout } = useAuth()
  const { pathname } = useLocation();
  const isIndex = pathname === "/";

  return (
    <SocketProvider>
      <div className="h-screen flex flex-col bg-surface-primary">
        <header className={`bg-surface-elevated/80 glass border-b border-separator h-[52px] items-center justify-between px-4 flex-shrink-0 ${isIndex ? 'flex' : 'hidden sm:flex'}`}>
          <Link
            to="/"
            className="text-[1.0625rem] font-medium text-text-primary no-underline tracking-tight"
          >
            Zype
          </Link>

          <div className="flex items-center gap-1.5">
            <Link
              to="/users/me"
              className="size-[32px] rounded-full bg-surface-secondary flex items-center justify-center text-text-secondary hover:bg-surface-tertiary hover:text-text-primary transition-colors duration-150"
              aria-label="Profile"
            >
              <HugeiconsIcon icon={User02Icon} size={18} strokeWidth={2} />
            </Link>
            <button
              onClick={() => {
                logout()
                navigate({ to: "/auth" })
              }}
              className="text-[0.8125rem] font-medium text-text-secondary hover:text-text-primary transition-colors duration-150 px-2 py-1.5 rounded-lg hover:bg-surface-secondary"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex gap-3 p-3 sm:p-4 flex-1 overflow-hidden">
          <div
            className={`sm:w-[35%] sm:flex ${isIndex ? "flex" : "hidden"} w-full flex-col`}
          >
            <div className="px-3 pt-3 pb-2">
              <div className="bg-surface-secondary rounded-xl p-0.5 flex relative">
                <div
                  className="absolute top-0.5 bottom-0.5 w-1/2 rounded-[18px] bg-accent transition-all duration-500 ease-spring z-0"
                  style={{
                    left: activeTab === 0 ? '2px' : 'calc(50% + 2px)',
                  }}
                />
                <button
                  className={`relative z-10 w-full py-2 text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-150 ${activeTab === 0 ? 'text-white' : 'text-text-secondary'}`}
                  onClick={() => setActiveTab(0)}
                >
                  Chats
                </button>
                <button
                  className={`relative z-10 w-full py-2 text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-150 ${activeTab === 1 ? 'text-white' : 'text-text-secondary'}`}
                  onClick={() => setActiveTab(1)}
                >
                  Users
                </button>
              </div>
            </div>

            <section className="flex-1 overflow-y-auto px-2 pb-2">
              {activeTab === 0 ? (
                data && data.chats.length > 0 ? (
                  <div className="space-y-0.5">
                    {data.chats.map((chat: Chat) => <ChatCard key={chat.id} chat={chat} token={token} />)}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-text-tertiary text-[0.8125rem]">No chats yet</p>
                  </div>
                )
              ) : data && data.users.length > 0 ? (
                <div className="space-y-0.5">
                  {data.users.map((user: User) => <UserCard key={user.id} user={user} />)}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-text-tertiary text-[0.8125rem]">No users available</p>
                </div>
              )}
            </section>
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </SocketProvider>
  );
};
