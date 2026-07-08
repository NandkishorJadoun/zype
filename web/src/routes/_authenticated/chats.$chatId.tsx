import { createFileRoute } from '@tanstack/react-router'
import type { Chat, Message } from '../../types';
import { ChatHeader } from '../../components/ChatHeader';
import { chatQueryOptions, postMessage } from '../../utils/chat-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatTime } from '../../utils/format-time';
import { ChatForm } from '../../components/ChatForm';
import { useEffect } from 'react';
import { useSocket } from '../../context/socket';

export const Route = createFileRoute('/_authenticated/chats/$chatId')({
  loader: async ({ context, params }) => {
    const { chatId } = params
    const { user, queryClient } = context
    const { token } = user

    await queryClient.ensureQueryData(chatQueryOptions(token, chatId))
    return { token, queryClient, chatId }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { token, queryClient, chatId } = Route.useLoaderData()
  const { data } = useQuery(chatQueryOptions(token, chatId))
  const { users, messages }: Chat = data
  const receiver = users[0];

  const { mutate, isPending } = useMutation({
    mutationFn: postMessage
  })

  const socket = useSocket()

  useEffect(() => {
    socket.emit("joinChat", chatId);

    const handleNewMessage = (message: Message) => {
      queryClient.setQueryData(chatQueryOptions(token, chatId).queryKey, (old: Chat | undefined) => {
        if (!old) return old;
        return { ...old, messages: [...old.messages, message] };
      });
    };

    socket.on("newMessage", handleNewMessage)

    return () => {
      socket.emit("leaveChat", chatId)
      socket.off("newMessage", handleNewMessage)
    };

  }, [socket, chatId, queryClient, token]);

  const handleSubmitMessage = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.currentTarget;
    const formData = new FormData(target);
    const message = formData.get("message")
    if (!message || typeof message !== "string" || !message.trim()) return
    mutate({ token, chatId, formData }, {
      onSuccess: () => target.reset()
    })
    target.reset()
  }

  const senderStyles = "self-end bg-blue-600 rounded-bl-xl";
  const receiverStyles = "self-start bg-slate-800 border border-slate-700 rounded-br-xl";

  return (
    <div className="flex-1 flex flex-col dark:bg-slate-900/90 border dark:border-slate-800 rounded-2xl">
      <ChatHeader user={receiver} />
      <main className="p-2 flex-1 flex flex-col-reverse gap-1.5 overflow-y-auto">
        {[...messages].reverse().map((msg) => {
          const time = formatTime(msg.created_at)

          return (
            <div
              key={msg.id}
              className={`${msg.userId === receiver.id ? "self-start" : "self-end"}`}
            >
              <p
                className={`rounded-tl-xl rounded-tr-xl p-2 break-all ${msg.userId === receiver.id ? receiverStyles : senderStyles}`}
              >
                {msg.data}
              </p>
              <p
                className={`opacity-75 text-sm mt-0.5 ${msg.userId === receiver.id ? "text-start" : "text-end"}`}
              >
                {time}
              </p>
            </div>
          );
        })}
      </main>
      <ChatForm isPending={isPending} submitHandler={handleSubmitMessage} />
    </div>
  );
};