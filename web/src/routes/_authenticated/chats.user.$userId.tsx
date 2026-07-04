import { SentIcon, SmilePlusIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router'
import { ChatHeader } from '../../components/ChatHeader';
import type { Chat, User } from '../../types';
import React, { useState } from 'react';

export const Route = createFileRoute('/_authenticated/chats/user/$userId')({
  loader: async ({ context, params }) => {
    const { userId } = params
    const { token } = context.user
    const BASE_URL = import.meta.env.VITE_API_URL;
    const options = { headers: { Authorization: `Bearer ${token}` } }

    const res = await fetch(`${BASE_URL}/chats/user/${userId}`, options)

    if (!res.ok) {
      throw new Error("Fail to load chat")
    }

    const { user, chat } = await res.json()
    return { user, chat, token };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user, chat, token }: { user: User; chat: Chat | null; token: string } = Route.useLoaderData();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("hello this is testing!")

  if (chat) {
    return <Navigate to='/chats/$chatId' params={{ chatId: chat.id }} />;
  }

  const createChatHandler = async (e: React.SubmitEvent) => {
    e.preventDefault()

    if (!message.trim()) return
    setIsLoading(true)

    const url = `${import.meta.env.VITE_API_URL}/chats/user/${user.id}`

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
        throw new Error("Failed to create chat")
      }

      const { id } = await res.json()

      return navigate({ to: "/chats/$chatId", params: { chatId: id } })

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col dark:bg-slate-900/90 border dark:border-slate-800 rounded-2xl">
      <ChatHeader user={user} />
      <main className="p-2 flex-1 flex items-center justify-center gap-1.5 overflow-y-auto">
        <div className="max-w-3xs w-full p-6 text-center bg-slate-800/50 border dark:border-slate-700 rounded-2xl shadow-2xl">
          <HugeiconsIcon
            icon={SmilePlusIcon}
            strokeWidth={1.5}
            size={40}
            className="mx-auto mb-4"
          />
          <h3 className="font-medium text-lg mb-1">Start the conversation</h3>
          <p className="text-slate-400 text-sm">
            Send a friendly message to your friend to get things moving.
          </p>
        </div>
      </main>
      <form onSubmit={createChatHandler}
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