import { createFileRoute, useRouter } from '@tanstack/react-router'
import type { Chat } from '../../types';
import { ChatHeader } from '../../components/ChatHeader';
import { HugeiconsIcon } from '@hugeicons/react';
import { SentIcon } from '@hugeicons/core-free-icons';
import { useState } from 'react';

export const Route = createFileRoute('/_authenticated/chats/$chatId')({
  loader: async ({ context, params }) => {
    const { chatId } = params
    const { token } = context.user
    const BASE_URL = import.meta.env.VITE_API_URL;
    const options = { headers: { Authorization: `Bearer ${token}` } }

    const res = await fetch(`${BASE_URL}/chats/${chatId}`, options)

    if (!res.ok) {
      throw new Error("Fail to load chat")
    }

    const chat = await res.json()
    return { chat, token };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { chat, token }: { chat: Chat, token: string } = Route.useLoaderData();
  const user = chat.users[0];
  const { messages, id } = chat;
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  // TODO: find out a better way to sync the user/chat list
  router.invalidate()

  const submitMessageHandler = async (e: React.SubmitEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    setIsLoading(true)

    const url = `${import.meta.env.VITE_API_URL}/chats/${id}`

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    }

    try {
      const res = await fetch(url, options)

      if (!res.ok) {
        throw new Error("Failed to send message")
      }

      router.invalidate()

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="flex-1 flex flex-col dark:bg-slate-900/90 border dark:border-slate-800 rounded-2xl">
      <ChatHeader user={user} />
      <main className="p-2 flex-1 flex flex-col-reverse gap-1.5 overflow-y-auto">
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
              className={`${msg.userId === user.id ? "self-start" : "self-end"}`}
            >
              <p
                className={`rounded-tl-xl rounded-tr-xl p-2 break-all ${msg.userId === user.id ? receiverStyles : senderStyles}`}
              >
                {msg.data}
              </p>
              <p
                className={`opacity-75 text-sm mt-0.5 ${msg.userId === user.id ? "text-start" : "text-end"}`}
              >
                {time}
              </p>
            </div>
          );
        })}
      </main>
      <form
        onSubmit={submitMessageHandler}
        className=" border p-1 mx-3 mb-2 dark:border-slate-700 dark:bg-slate-950/15 backdrop-blur-xs flex gap-1 rounded-4xl h-16 items-center"
      >
        <textarea
          rows={1}
          className="focus:outline-0 focus:outline-blue-600 px-3 py-3 flex-1 resize-none rounded-4xl"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write Your Message..."
        />
        <button
          disabled={isLoading}
          className="bg-blue-600 font-bold p-3.5 rounded-full active:scale-[0.95] transition-all duration-200 shadow-lg shadow-blue-900/20 disabled:opacity-50"
        >
          <HugeiconsIcon icon={SentIcon} strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );
};