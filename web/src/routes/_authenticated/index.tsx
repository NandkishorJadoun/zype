import { LookLeftIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="hidden sm:flex flex-1 items-center justify-center p-8">
      <div className="text-center max-w-[240px]">
        <HugeiconsIcon
          icon={LookLeftIcon}
          size={32}
          strokeWidth={1.5}
          className="mx-auto mb-5 text-text-tertiary/40"
        />
        <h2 className="font-semibold text-[0.9375rem] text-text-secondary mb-1.5">
          No Conversation Selected
        </h2>
        <p className="text-[0.8125rem] text-text-tertiary leading-relaxed">
          Choose a chat from the sidebar to start messaging.
        </p>
      </div>
    </div>
  );
}
