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
    )
}