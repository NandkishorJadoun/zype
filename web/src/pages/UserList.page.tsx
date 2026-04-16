import { Header } from "../components/Header";
import { useLoaderData, Link } from "react-router";
import { UserCard } from "../components/UserCard";
import type { User } from "../types";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChatIcon } from "@hugeicons/core-free-icons";

function UserListPage() {
  const users: User[] = useLoaderData();

  return (
    <div className="relative">
      <Header />
      <main className="p-3 mt-16">
        <div className="font-semibold opacity-75">USERS</div>
        {users.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </main>
      <Link
        className="bg-blue-600 fixed bottom-10 right-5 flex gap-1 py-2 px-3 font-semibold rounded-full shadow-lg shadow-blue-900/40 active:scale-[0.95] transition-all duration-200"
        to={"/chats"}
      >
        <HugeiconsIcon icon={ChatIcon} color="white" strokeWidth={2.5} /> Chats
      </Link>
    </div>
  );
}

export default UserListPage;
