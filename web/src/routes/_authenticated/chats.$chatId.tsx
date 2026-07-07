import { createFileRoute } from '@tanstack/react-router'
import type { Chat } from '../../types';
import { ChatHeader } from '../../components/ChatHeader';
import { HugeiconsIcon } from '@hugeicons/react';
import { SentIcon } from '@hugeicons/core-free-icons';
import { chatQueryOptions, postMessage } from '../../utils/chat-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatTime } from '../../utils/format-time';

export const Route = createFileRoute('/_authenticated/chats/$chatId')({
  loader: async ({ context, params }) => {
    const { chatId } = params
    const { user, queryClient } = context
    const { token } = user

    await context.queryClient.ensureQueryData(chatQueryOptions(token, chatId))
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
    mutationFn: postMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] })
    }
  })

  const submitMessageHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
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
      <form
        onSubmit={submitMessageHandler}
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