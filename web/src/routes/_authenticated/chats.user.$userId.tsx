import { SentIcon, SmilePlusIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { ChatHeader } from '../../components/ChatHeader';
import type { Chat, User } from '../../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createChat, userChatQueryOptions } from '../../utils/user-chat-query';


export const Route = createFileRoute('/_authenticated/chats/user/$userId')({
  loader: async ({ context, params }) => {
    const { userId } = params
    const { user, queryClient } = context
    const { token } = user

    const { chat }: { chat: Chat } = await queryClient.ensureQueryData(userChatQueryOptions(token, userId))

    if (chat) {
      throw redirect({
        to: "/chats/$chatId",
        params: { chatId: chat.id }
      })
    }

    return { token, queryClient, userId };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { token, queryClient, userId } = Route.useLoaderData()
  const { data } = useQuery(userChatQueryOptions(token, userId))
  const { user }: { user: User } = data

  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: createChat,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['index'] })
      const { id }: Chat = data
      navigate({ to: "/chats/$chatId", params: { chatId: id } })
    }
  })

  const handleCreateChat = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.currentTarget;
    const formData = new FormData(target);
    const message = formData.get("message")
    if (!message || typeof message !== "string" || !message.trim()) return
    mutate({ token, userId, formData }, {
      onSuccess: () => target.reset()
    })
    target.reset()
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
      <form onSubmit={handleCreateChat}
        className=" border p-1 mx-3 mb-2 dark:border-slate-700 dark:bg-slate-950/15 backdrop-blur-xs flex gap-1 rounded-4xl h-16 items-center"
      >
        <textarea
          rows={1}
          className="focus:outline-0 focus:outline-blue-600 px-3 py-3 flex-1 resize-none rounded-4xl"
          name="message"
          placeholder="Write Your Message..."
        />
        <button
          disabled={isPending}
          className="bg-blue-600 font-bold p-3.5 rounded-full active:scale-[0.95] transition-all duration-200 shadow-lg shadow-blue-900/20 disabled:opacity-50"
        >
          <HugeiconsIcon icon={SentIcon} strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );
};