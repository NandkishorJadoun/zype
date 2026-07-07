import { createFileRoute, Link, Outlet, redirect, useLocation, useNavigate } from '@tanstack/react-router'
import { UserCard } from '../components/UserCard';
import { ChatCard } from '../components/ChatCard';
import type { Chat, User } from '../types';
import { useState } from 'react';
import { useAuth } from "../context/auth";
import { useQuery } from '@tanstack/react-query';
import { indexQueryOptions } from '../utils/index-query';

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
    <div className="h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center dark:border-slate-800 border dark:bg-slate-900 rounded-2xl mt-3 mx-3 font-semibold">
        <Link className="text-2xl" to={"/"}>
          Zype
        </Link>
        <div className="flex gap-3">
          <Link to={`/users/me`} className="hover:underline">
            User
          </Link>

          <button
            className="hover:underline"
            onClick={() => {
              logout()
              navigate({ to: "/auth" })
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex gap-3 p-3 flex-1 overflow-hidden">
        {
          <div
            className={`sm:w-[35%] sm:flex ${isIndex ? "flex" : "hidden"} w-full flex-col`}
          >
            <div className="relative flex border dark:border-slate-800 dark:bg-slate-900 rounded-t-2xl border-b-0">
              <div
                className="absolute bottom-1 rounded-xl w-[calc(50%-4px)] border-blue-600 transition-transform duration-200 border-b-4"
                style={{
                  transform: `translateX(${activeTab === 0 ? "4px" : "calc(100% + 4px)"})`,
                }}
              />
              <button
                className="relative z-10 w-full py-4 font-semibold text-lg"
                onClick={() => setActiveTab(0)}
              >
                Chats
              </button>
              <button
                className="relative z-10 w-full py-4 font-semibold text-lg"
                onClick={() => setActiveTab(1)}
              >
                Users
              </button>
            </div>
            <section className="p-2 dark:bg-slate-900 dark:border-slate-800 border rounded-b-2xl flex flex-col flex-1 overflow-y-auto">
              {activeTab === 0 ? (
                data && data.chats.length > 0 ? (
                  data.chats.map((chat: Chat) => <ChatCard key={chat.id} chat={chat} token={token} />)
                ) : (
                  <p className="m-auto text-slate-500 text-sm">No chats yet</p>
                )
              ) : data && data.users.length > 0 ? (
                data.users.map((user: User) => <UserCard key={user.id} user={user} />)
              ) : (
                <p className="m-auto text-slate-500 text-sm">No user available</p>
              )}
            </section>
          </div>
        }
        <Outlet />
      </main>
    </div>
  );
};