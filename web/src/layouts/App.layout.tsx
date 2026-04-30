import { useState } from "react";
import {
  useLoaderData,
  Outlet,
  Link,
  useNavigate,
  useLocation,
} from "react-router";
import type { User, Chat } from "../types";
import { ChatCard } from "../components/ChatCard";
import { UserCard } from "../components/UserCard";

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { chats, users }: { chats: Chat[]; users: User[] } = useLoaderData();
  const navigate = useNavigate();
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
              const keysToRemove = ["user", "token"];
              keysToRemove.forEach((key) => localStorage.removeItem(key));
              return navigate("/auth");
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
                chats.length > 0 ? (
                  chats.map((chat) => {
                    return <ChatCard key={chat.id} chat={chat} />;
                  })
                ) : (
                  <p className="m-auto text-slate-500 text-sm">No chats yet</p>
                )
              ) : users.length > 0 ? (
                users.map((user) => {
                  return <UserCard key={user.id} user={user} />;
                })
              ) : (
                <p className="m-auto text-slate-500 text-sm">
                  No user available
                </p>
              )}
            </section>
          </div>
        }
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
