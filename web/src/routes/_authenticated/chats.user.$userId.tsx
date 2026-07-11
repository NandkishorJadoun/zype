import { SmilePlusIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { ChatHeader } from '../../components/ChatHeader';
import type { Chat, User } from '../../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createChat, userChatQueryOptions } from '../../utils/user-chat-query';
import { ChatForm } from '../../components/ChatForm';

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
    <div className="flex-1 flex flex-col bg-surface-primary rounded-xl overflow-hidden">
      <ChatHeader user={user} />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-[240px]">
          <HugeiconsIcon
            icon={SmilePlusIcon}
            size={32}
            strokeWidth={1.5}
            className="mx-auto mb-5 text-text-tertiary/40"
          />
          <h2 className="font-semibold text-[0.9375rem] text-text-secondary mb-1.5">
            Start the Conversation
          </h2>
          <p className="text-[0.8125rem] text-text-tertiary leading-relaxed">
            Send a friendly message to get things moving.
          </p>
        </div>
      </main>
      <ChatForm isPending={isPending} submitHandler={handleCreateChat} />
    </div>
  );
};
