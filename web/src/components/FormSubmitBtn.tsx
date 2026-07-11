export const FormButton = ({ isPending, children }: { isPending: boolean, children: string }) => {
    return (
        <button
            disabled={isPending}
            className="w-full bg-accent text-white text-[1.0625rem] font-semibold py-3.5 rounded-full active:scale-[0.97] transition-all duration-150 disabled:opacity-50"
        >
            {isPending ? "Loading\u2026" : children}
        </button>
    )
}
