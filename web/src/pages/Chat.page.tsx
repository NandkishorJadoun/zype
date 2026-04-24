import type { Chat, Message } from "../types";
import { useLoaderData } from "react-router";
import { useState } from "react";
import { ChatHeader } from "../components/ChatHeader";
import { ChatForm } from "../components/ChatForm";

const ChatPage = () => {
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
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen dark:bg-slate-900/90 border-x dark:border-slate-800">
      <ChatHeader user={{ username, id }} backUrl="/chats" />
      <main className="p-2 py-20 flex-1 flex flex-col-reverse gap-1.5  overflow-y-auto">
        {[...messages].reverse().map((msg) => {
          const options = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          } as const;

          const time = new Date(msg.created_at).toLocaleTimeString(
            "en-US",
            options,
          );

          const senderStyles = "self-end bg-blue-600 rounded-bl-xl";

          const receiverStyles =
            "self-start bg-slate-800 border border-slate-700 rounded-br-xl";

          return (
            <div
              key={msg.id}
              className={`${msg.userId === id ? "self-start" : "self-end"}`}
            >
              <p
                className={`rounded-tl-xl rounded-tr-xl p-2 break-all ${msg.userId === id ? receiverStyles : senderStyles}`}
              >
                {msg.data}
              </p>
              <p
                className={`opacity-75 text-sm mt-0.5 ${msg.userId === id ? "text-start" : "text-end"}`}
              >
                {time}
              </p>
            </div>
          );
        })}
      </main>

      <ChatForm
        message={message}
        setMessage={setMessage}
        submitHandler={submitMessage}
      />
    </div>
  );
};

export default ChatPage;
