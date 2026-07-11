import type { Chat } from "../types";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChat } from "../utils/delete-chat-query";
import { UserAvatar } from "./UserAvatar";

export const ChatCard = ({ chat, token }: { chat: Chat, token: string }) => {
  const queryClient = useQueryClient()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['index'] })
    }
  })

  const { id } = chat;
  const user = chat.users[0];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  const message = chat.messages[0]?.data;

  const isCurrentChat = pathname.includes(id)

  const handleDeleteChat = () => {
    mutate({ token, chatId: chat.id }, {
      onSuccess: () => {
        closeDialog();
        if (isCurrentChat) {
          navigate({ to: "/" })
        }
      }
    })
  }

  return (
    <div
      className={`rounded-xl transition-colors duration-150 ${isCurrentChat ? 'bg-accent/10' : 'hover:bg-surface-secondary'}`}
    >
      <div className="py-2.5 px-3 flex items-center gap-3">
        <Link
          to="/users/$userId" params={{ userId: user.id }}
          className="size-10 rounded-full overflow-hidden flex-shrink-0 bg-surface-secondary"
        >
          <UserAvatar avatar={user.avatar} username={user.username} />
        </Link>

        <Link className="flex-1 min-w-0" to="/chats/$chatId" params={{ chatId: id }}>
          <p className="font-semibold text-[0.9375rem] text-text-primary">{user.username}</p>
          <p className="text-[0.8125rem] text-text-tertiary truncate mt-0.5">
            {message ?? "No messages yet"}
          </p>
        </Link>

        <div className="flex-shrink-0 relative">
          <button
            className="size-[28px] flex items-center justify-center rounded-full text-text-secondary hover:bg-surface-tertiary hover:text-text-primary transition-colors duration-150 cursor-pointer"
            popoverTarget={`chat-card-dropdown-${id}`}
            style={{ anchorName: `--anchor-${id}` }}
            aria-label="Chat options"
          >
            <HugeiconsIcon icon={MoreVerticalIcon} size={18} />
          </button>

          <div
            id={`chat-card-dropdown-${id}`}
            popover="auto"
            className="min-w-[160px] bg-surface-elevated rounded-xl shadow-xl border border-separator backdrop-blur-xl"
            style={{
              position: "absolute",
              margin: 0,
              inset: "auto",
              positionAnchor: `--anchor-${id}`,
              top: "anchor(bottom)",
              right: "anchor(right)",
              marginRight: "4px",
              marginTop: "8px",
            }}
          >
            <div className="p-1.5 flex flex-col">
              <Link
                to="/chats/$chatId" params={{ chatId: id }}
                className="text-left px-3 py-2 text-[0.875rem] text-text-primary hover:bg-surface-secondary rounded-lg transition-colors duration-150"
              >
                Open Chat
              </Link>
              <Link
                to="/users/$userId" params={{ userId: user.id }}
                className="text-left px-3 py-2 text-[0.875rem] text-text-primary hover:bg-surface-secondary rounded-lg transition-colors duration-150"
              >
                Profile
              </Link>
              <div className="h-px bg-separator my-1 mx-2" />
              <button
                onClick={openDialog}
                className="text-left px-3 py-2 text-[0.875rem] text-destructive hover:bg-surface-secondary rounded-lg transition-colors duration-150"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-auto rounded-2xl shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm bg-surface-elevated border border-separator max-w-[320px] w-full p-0 open:flex open:flex-col"
        onClick={(e) => { if (e.target === dialogRef.current) closeDialog() }}
      >
        <div className="px-6 pt-6 pb-4 text-center">
          <h3 className="text-[1.0625rem] font-semibold text-text-primary mb-2">
            Delete Chat?
          </h3>
          <p className="text-[0.8125rem] text-text-secondary leading-relaxed">
            This conversation will be permanently deleted. This action cannot be undone.
          </p>
        </div>

        <div className="border-t border-separator mx-0">
          <button
            disabled={isPending}
            className="w-full py-3.5 text-center text-[0.875rem] font-semibold text-destructive hover:bg-surface-secondary transition-colors duration-150 disabled:opacity-50"
            onClick={handleDeleteChat}
          >
            Delete
          </button>
          <div className="h-px bg-separator mx-0" />
          <button
            onClick={closeDialog}
            className="w-full py-3.5 text-center text-[0.875rem] font-semibold text-text-primary hover:bg-surface-secondary transition-colors duration-150 rounded-b-2xl"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};
