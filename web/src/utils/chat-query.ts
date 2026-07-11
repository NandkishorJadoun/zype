import { queryOptions } from "@tanstack/react-query";
import { API_URL } from "../config";

export const fetchChat = async (token: string, chatId: string, signal: AbortSignal) => {
    const options = { headers: { Authorization: `Bearer ${token}` }, signal }

    const res = await fetch(`${API_URL}/chats/${chatId}`, options)
    if (!res.ok) throw new Error("Fail to load chat")
    return res.json()
}

export const chatQueryOptions = (token: string, chatId: string) =>
    queryOptions({
        queryKey: ['chats', chatId, token],
        queryFn: ({ signal }) => fetchChat(token, chatId, signal),
    })


export const postMessage = async ({ token, chatId, formData }: { token: string; chatId: string; formData: FormData }) => {
    const options = {
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST',
        body: formData,
    }

    const res = await fetch(`${API_URL}/chats/${chatId}`, options)

    if (!res.ok) {
        throw new Error("Failed to submit message")
    }

    return res.json()
}