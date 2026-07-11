import { SentIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

interface ChatFormProps {
    isPending: boolean;
    submitHandler: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>
}

export const ChatForm = ({ isPending, submitHandler }: ChatFormProps) => {
    return (
        <form
            onSubmit={submitHandler}
            className="flex items-end gap-2 px-4 py-3 border-t border-separator bg-surface-elevated/60 glass"
        >
            <textarea
                rows={1}
                className="flex-1 resize-none rounded-2xl bg-surface-secondary px-4 py-3 text-[0.9375rem] text-text-primary placeholder:text-text-tertiary leading-relaxed min-h-[44px] max-h-[120px]"
                name="message"
                placeholder="Message..."
            />
            <button
                disabled={isPending}
                className="bg-accent text-white rounded-full size-[44px] flex items-center justify-center flex-shrink-0 active:scale-90 transition-all duration-150 disabled:opacity-50"
                aria-label="Send message"
            >
                <HugeiconsIcon icon={SentIcon} size={20} strokeWidth={2.5} />
            </button>
        </form>
    )
}
