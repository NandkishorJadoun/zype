import { queryOptions } from "@tanstack/react-query";
import { API_URL } from "../config";

export const fetchUserChat = async (token: string, userId: string, signal: AbortSignal) => {
    const options = { headers: { Authorization: `Bearer ${token}` }, signal }

    const res = await fetch(`${API_URL}/chats/user/${userId}`, options)
    if (!res.ok) throw new Error("Fail to load chat")
    return res.json()
}

export const userChatQueryOptions = (token: string, userId: string) =>
    queryOptions({
        queryKey: ['userchat', userId, token],
        queryFn: ({ signal }) => fetchUserChat(token, userId, signal),
    })

export const createChat = async ({ token, userId, formData }: { token: string; userId: string; formData: FormData }) => {
    const options = {
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST',
        body: formData,
    }
    const res = await fetch(`${API_URL}/chats/user/${userId}`, options)

    if (!res.ok) {
        throw new Error("Failed to create chat")
    }

    return res.json()
}