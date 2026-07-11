import { createFileRoute } from '@tanstack/react-router'
import type { Chat, Message } from '../../types';
import { ChatHeader } from '../../components/ChatHeader';
import { chatQueryOptions, postMessage } from '../../utils/chat-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatTime } from '../../utils/format-time';
import { ChatForm } from '../../components/ChatForm';
import { useEffect, useRef } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

  const isOwnMessage = (msg: Message) => msg.userId !== receiver.id;

  const isSameSenderAsPrevious = (index: number) => {
    if (index === 0) return false;
    return isOwnMessage(messages[index]) === isOwnMessage(messages[index - 1]);
  };

  const isSameSenderAsNext = (index: number) => {
    if (index === messages.length - 1) return false;
    return isOwnMessage(messages[index]) === isOwnMessage(messages[index + 1]);
  };

  return (
    <div className="flex-1 flex flex-col bg-surface-primary rounded-xl overflow-hidden">
      <ChatHeader user={receiver} />
      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-1 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-text-tertiary text-[0.8125rem]">No messages yet</p>
          </div>
        ) : (
          [...messages].map((msg, index) => {
            const own = isOwnMessage(msg);
            const isGroupStart = !isSameSenderAsPrevious(index);
            const isGroupEnd = !isSameSenderAsNext(index);
            const time = formatTime(msg.created_at);

            return (
              <div
                key={msg.id}
                className={`flex ${own ? 'justify-end' : 'justify-start'} ${!isGroupStart ? 'mt-0.5' : 'mt-2'}`}
              >
                <div className={`max-w-[75%] ${own ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div
                    className={`px-3.5 py-2 text-[0.9375rem] leading-relaxed break-words ${
                      own
                        ? 'bg-accent text-white rounded-[18px] rounded-br-[6px]'
                        : 'bg-surface-secondary text-text-primary rounded-[18px] rounded-bl-[6px]'
                    }`}
                  >
                    {msg.data}
                  </div>
                  {isGroupEnd && (
                    <p className={`text-[0.6875rem] text-text-tertiary mt-1 ${own ? 'text-right mr-1' : 'text-left ml-1'}`}>
                      {time}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </main>
      <ChatForm isPending={isPending} submitHandler={handleSubmitMessage} />
    </div>
  );
};
