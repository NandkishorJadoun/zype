import { Link } from "react-router";
const { username } = JSON.parse(localStorage.getItem("user"));

export const Header = () => {
  const profile = username[0].toUpperCase();

  return (
    <header className="flex justify-between items-center border-b py-3 px-2">
      <Link className="text-2xl font-semibold" to={"/chats"}>
        Zype
      </Link>
      <button className="border w-8 h-8 rounded-[50%] flex items-center justify-center">
        {profile}
      </button>
    </header>
  );
};