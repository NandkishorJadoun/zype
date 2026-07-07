import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export const FormButton = ({ isPending, children }: { isPending: boolean, children: string }) => {

    return (
        <button disabled={isPending} className="font-bold bg-blue-600 text-xl py-3 rounded-xl flex items-center justify-center gap-1 disabled:opacity-50">
            {children}{" "}
            <HugeiconsIcon icon={ArrowRight02FreeIcons} strokeWidth={2.5} />
        </button>
    )
} 