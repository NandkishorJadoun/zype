import { LookLeftIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="hidden sm:flex flex-1 dark:bg-slate-900/90 border dark:border-slate-800 rounded-2xl items-center justify-center p-3 ">
      <div className="max-w-3xs w-full p-6 text-center bg-slate-800/50 border dark:border-slate-700 rounded-2xl shadow-2xl">
        <HugeiconsIcon
          icon={LookLeftIcon}
          strokeWidth={1.5}
          size={40}
          className="mx-auto mb-4"
        />
        <h3 className="font-medium text-lg mb-1">Select a chat/user</h3>
        <p className="text-slate-400 text-sm">
          Select a conversation to start messaging.
        </p>
      </div>
    </div>
  );
}
