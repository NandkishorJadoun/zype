import { useState } from "react";
import { Header } from "../components/Header";
import { useLoaderData, Outlet } from "react-router";
import { ChatCard } from "../components/ChatCard";
import type { User, Chat } from "../types";
import { UserCard } from "../components/UserCard";
<button>Chats</button>;

const ChatListLayout = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { chats, users }: { chats: Chat[]; users: User[] } = useLoaderData();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex gap-3 p-3 flex-1 overflow-hidden">
        <aside className="w-[35%] flex flex-col">
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
            {activeTab === 0
              ? chats.map((chat) => {
                  return <ChatCard key={chat.id} chat={chat} />;
                })
              : users.map((user) => {
                  return <UserCard key={user.id} user={user} />;
                })}
          </section>
        </aside>
        <Outlet />
      </main>
    </div>
  );
};

export default ChatListLayout;
