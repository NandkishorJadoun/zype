import { Header } from "../components/Header";
import { useLoaderData } from "react-router";
import { UserCard } from "../components/UserCard";
import type { User } from "../types";

export const UserListPage = () => {
  const users: User[] = useLoaderData();

  return (
    <>
      <Header />
      <div className="border-b flex justify-between items-center py-1.5 px-2">
        <div className="text-lg">Users</div>
        <div className="">{users.length}</div>
      </div>
      {users.map((user) => {
        return <UserCard key={user.id} user={user} />;
      })}
    </>
  );
};

