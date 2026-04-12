import { Header } from "../components/Header";
import { useLoaderData, Link } from "react-router";
import { ChatCard } from "../components/ChatCard";
import type { Chat } from "../types";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChatAdd01FreeIcons } from "@hugeicons/core-free-icons";

export const ChatListPage = () => {
  const chats: Chat[] = useLoaderData();

  return (
    <div className="relative">
      <Header />
      <main className="p-3 mt-16">
        <div className="font-semibold opacity-75">CHATS</div>
        {chats.map((chat) => {
          return <ChatCard key={chat.id} chat={chat} />;
        })}
      </main>
      <Link
        className="bg-blue-600 fixed bottom-10 right-5 flex gap-1 py-2 px-3 font-semibold rounded-full"
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
