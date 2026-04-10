import { useLoaderData, Navigate, useNavigate, Link } from "react-router";
import type { User, Chat } from "../types";
import { useState } from "react";

export const UserPage = () => {
  const { user, chat }: { user: User; chat: Chat | null } = useLoaderData();
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  if (chat) {
    console.log("RUN LOADER FIRST", chat);
    return <Navigate to={`/chats/${chat.id}`} />;
  }

  const token = localStorage.getItem("token");

  const { username, id } = user;
  const profile = username[0].toUpperCase();

  const submitMessage = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/chats/user/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        },
      );

      if (!res.status) {
        throw new Error("Some Server Error...");
      }

      const chat: Chat = await res.json();

      return navigate(`/chats/${chat.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b flex justify-center p-2 items-center relative">
        <Link to={"/users"} className="absolute right-[90%]">
          Back
        </Link>
        <div className="flex items-center gap-2">
          <div className="border w-8 h-8 rounded-[50%] flex items-center justify-center">
            {profile}
          </div>
          <p className="font-semibold">{username}</p>
        </div>
      </header>

      <div className="flex-1 flex items-baseline-last p-2 overflow-x-auto">
        <div className="border p-1">
          <p>Send "Hello" to your new friend...</p>
          <button
            onClick={() => setMessage("Hello")}
            className="bg-black text-white px-2 py-1"
          >
            Hello
          </button>
        </div>
      </div>
      <div className="border-t p-2">
        <form className="flex gap-2" onSubmit={submitMessage}>
          <textarea
            className="border flex-1 p-2"
            name="message"
            placeholder="Write Your Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="bg-black text-white font-bold p-3">Send</button>
        </form>
      </div>
    </div>
  );
};
