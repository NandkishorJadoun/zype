import { Header } from "../components/Header";
import { useLoaderData } from "react-router";

export const ChatListPage = () => {
  const chats = useLoaderData();

  return (
    <>
      <Header />
      <div className="border-b flex justify-between items-center py-1.5 px-2">
        <div className="text-lg">Chats</div>
        <div className="">{chats.length}</div>
      </div>
      <div>{JSON.stringify(chats)}</div>
    </>
  );
};
