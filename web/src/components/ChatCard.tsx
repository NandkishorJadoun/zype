import type { Chat } from "../types";
import { HugeiconsIcon } from "@hugeicons/react";
import { User02FreeIcons, MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChat } from "../utils/delete-chat-query";

export const ChatCard = ({ chat, token }: { chat: Chat, token: string }) => {
  const queryClient = useQueryClient()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      console.log("SUCCESS")
      queryClient.invalidateQueries({ queryKey: ['index'] })
    }
  })

  const { id } = chat;
  const user = chat.users[0];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  const message = chat.messages[0].data;

  const userAvatar = user.avatar ? (
    <img
      src={user.avatar}
      alt={`${user.username}'s profile`}
      className="size-full"
    />
  ) : (
    <HugeiconsIcon icon={User02FreeIcons} />
  );

  const isCurrentChat = pathname.includes(id)

  const handleDeleteChat = () => {
    mutate({ token, chatId: chat.id }, {
      onSuccess: () => {
      console.log("SUCCESS")
        closeDialog();
        if (isCurrentChat) {
          navigate({ to: "/" })
        }
      }
    })
  }

  return (
    <div className=" py-3 px-2 flex items-center gap-4 has-[.active]:bg-slate-800 rounded-xl">
      <Link
        to="/users/$userId" params={{ userId: user.id }}
        className="border dark:border-slate-700 w-10 h-10 overflow-hidden rounded-full flex dark:bg-slate-900 items-center justify-center"
      >
        {userAvatar}
      </Link>
      <div className="flex-1 flex min-w-0 justify-between items-center">
        <Link className="flex-1 min-w-0" to="/chats/$chatId" params={{ chatId: id }}>
          <p className="font-semibold">{user.username}</p>
          <p className="text-sm opacity-75 min-w-0 truncate">
            {message ?? "Message..."}
          </p>
        </Link>

        <div>
          <button
            className="cursor-pointer"
            popoverTarget={`chat-card-dropdown-${id}`}
            style={{ anchorName: `--anchor-${id}` }}
          >
            <HugeiconsIcon icon={MoreVerticalIcon} />
          </button>

          <div
            id={`chat-card-dropdown-${id}`}
            popover="auto"
            className="border dark:text-slate-100 dark:bg-slate-800 dark:border-slate-600 rounded shadow-2xl "
            style={{
              position: "absolute",
              margin: 0,
              inset: "auto",
              positionAnchor: `--anchor-${id}`,
              top: "anchor(bottom)",
              right: "anchor(right)",
              marginRight: "8px",
              marginTop: "8px",
            }}
          >
            <div className="flex flex-col min-w-28 p-1 backdrop-blur-2xl ">
              <Link
                to="/chats/$chatId" params={{ chatId: id }}
                className="text-left p-2 hover:bg-slate-700 rounded"
              >
                Open Chat
              </Link>
              <Link
                to="/users/$userId" params={{ userId: user.id }}
                className="text-left p-2 hover:bg-slate-700 rounded"
              >
                Profile
              </Link>
              <button
                onClick={openDialog}
                className="text-left p-2 hover:bg-slate-700 text-red-500 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-auto rounded-lg shadow-2xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm dark:bg-slate-900 dark:text-slate-100 border dark:border-slate-700 "
      >
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">
            Are you sure you want to delete this chat?
          </h3>

          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            This will delete this chat permanently. You cannot undo this action.
          </p>

          <div className="flex flex-col sm:flex-row-reverse gap-3">
            <button
              disabled={isPending}
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 font-semibold rounded-xl transition-colors active:scale-95 disabled:opacity-50"
              onClick={handleDeleteChat}
            >
              Delete Chat
            </button>
            <button
              onClick={closeDialog}
              className="flex-1 px-4 py-2.5 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-100 font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};