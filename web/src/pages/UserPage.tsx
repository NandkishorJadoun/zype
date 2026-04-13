import { useLoaderData, Navigate, useNavigate } from "react-router";
import type { User, Chat } from "../types";
import { useState } from "react";
import { ChatHeader } from "../components/ChatHeader";
import { ChatForm } from "../components/ChatForm";
import { HugeiconsIcon } from "@hugeicons/react";
import { LoveKoreanFingerIcon } from "@hugeicons/core-free-icons";

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
      <ChatHeader user={{ username, id }} backUrl="/users" />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-sm w-full p-6 text-center bg-slate-800/50 border border-slate-700 rounded-2xl backdrop-blur-sm shadow-xl">
          <HugeiconsIcon
            icon={LoveKoreanFingerIcon}
            strokeWidth={1.5}
            size={40}
            className="mx-auto mb-4"
          />
          <h3 className="font-medium text-lg mb-1">Start the conversation</h3>
          <p className="text-slate-400 text-sm mb-6">
            Send a friendly "Hello" to your new friend to get things moving.
          </p>

          <button
            onClick={() => setMessage("Hello")}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/20"
          >
            Say Hello
          </button>
        </div>
      </main>
      <ChatForm
        message={message}
        setMessage={setMessage}
        submitHandler={submitMessage}
      />
    </div>
  );
};
