import { useLoaderData, Navigate, useNavigate } from "react-router";
import type { User, Chat } from "../types";
import { useState } from "react";
import { ChatHeader } from "../components/ChatHeader";
import { ChatForm } from "../components/ChatForm";

export const UserPage = () => {
  const { user, chat }: { user: User; chat: Chat | null } = useLoaderData();
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  if (chat) {
    return <Navigate to={`/chats/${chat.id}`} />;
  }

  const token = localStorage.getItem("token");

  const { username, id } = user;

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
      <ChatHeader username={username} backUrl="/users" />
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
      <ChatForm
        message={message}
        setMessage={setMessage}
        submitHandler={submitMessage}
      />
    </div>
  );
};
