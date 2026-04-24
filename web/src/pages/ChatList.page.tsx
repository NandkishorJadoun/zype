import { Header } from "../components/Header";
import { useLoaderData, Link } from "react-router";
import { ChatCard } from "../components/ChatCard";
import type { Chat } from "../types";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChatAdd01FreeIcons } from "@hugeicons/core-free-icons";

const ChatListPage = () => {
  const chats: Chat[] = useLoaderData();

  return (
    <div className="relative flex flex-col min-h-screen border-x dark:border-slate-800 dark:bg-slate-900">
      <Header />
      <main className="p-3 mt-16 flex-1">
        <div className="font-semibold opacity-75">CHATS</div>
        {chats.map((chat) => {
          return <ChatCard key={chat.id} chat={chat} />;
        })}
      </main>
      <Link
        className="bg-blue-600 absolute bottom-10 right-5 flex gap-1 py-2 px-3 font-semibold rounded-full shadow-lg shadow-blue-900/40 active:scale-[0.95] transition-all duration-200"
        to={"/users"}
      >
        <HugeiconsIcon
          icon={ChatAdd01FreeIcons}
          color="white"
          strokeWidth={2.5}
        />{" "}
        New Chats
      </Link>
    </div>
  );
};

export default ChatListPage;
