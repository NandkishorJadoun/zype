import { queryOptions } from "@tanstack/react-query";

export const fetchChat = async (token: string, chatId: string, signal: AbortSignal) => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const options = { headers: { Authorization: `Bearer ${token}` }, signal }

    const res = await fetch(`${BASE_URL}/chats/${chatId}`, options)
    if (!res.ok) throw new Error("Fail to load chat")
    return res.json()
}

export const chatQueryOptions = (token: string, chatId: string) =>
    queryOptions({
        queryKey: ['chats', chatId, token],
        queryFn: ({ signal }) => fetchChat(token, chatId, signal),
    })


export const postMessage = async ({ token, chatId, formData }: { token: string; chatId: string; formData: FormData }) => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const options = {
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST',
        body: formData,
    }

    const res = await fetch(`${BASE_URL}/chats/${chatId}`, options)

    if (!res.ok) {
        throw new Error("Failed to submit message")
    }

    return res.json()
}