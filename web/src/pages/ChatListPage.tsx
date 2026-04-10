import { Header } from "../components/Header";
import { useLoaderData } from "react-router";
import { ChatCard } from "../components/ChatCard";
import type { Chat } from "../types";

export const ChatListPage = () => {
  const chats: Chat[] = useLoaderData();

  return (
    <>
      <Header />
      <div className="border-b flex justify-between items-center py-1.5 px-2">
        <div className="text-lg">Chats</div>
        <div className="">{chats.length}</div>
      </div>
      {chats.map((chat) => {
        return <ChatCard key={chat.id} chat={chat} />;
      })}
    </>
  );
};
