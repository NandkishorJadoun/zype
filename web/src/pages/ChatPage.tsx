import type { Chat, Message } from "../types";
import { useLoaderData } from "react-router";
import { useState } from "react";
import { ChatHeader } from "../components/ChatHeader";
import { ChatForm } from "../components/ChatForm";

export const ChatPage = () => {
  const chat: Chat = useLoaderData();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(chat.messages);

  const { username, id } = chat.users[0];

  const token = localStorage.getItem("token");

  const submitMessage = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/chats/${chat.id}`,
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

      const newMessage = await res.json();

      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader username={username} backUrl="/chats" />

      <div className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
        {messages.map((msg) => {
          return (
            <div
              key={msg.id}
              className={`border p-2 ${msg.userId === id ? "self-start bg-zinc-400" : "self-end"}`}
            >
              <p>{msg.data}</p>
              <p>{msg.created_at.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      <ChatForm
        message={message}
        setMessage={setMessage}
        submitHandler={submitMessage}
      />
      
    </div>
  );
};
