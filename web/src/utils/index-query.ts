import { queryOptions } from "@tanstack/react-query";
import { API_URL } from "../config";

export const fetchChatsAndUsers = async (token: string, signal: AbortSignal) => {
    const options = { headers: { Authorization: `Bearer ${token}` }, signal }
    const [chatsRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/chats`, options),
        fetch(`${API_URL}/users`, options),
    ]);

    if (!chatsRes.ok || !usersRes.ok) {
        throw new Error("Failed to fetch sidebar data");
    }

    const [{ chats }, { users }] = await Promise.all([
        chatsRes.json(),
        usersRes.json(),
    ]);

    return { chats, users }
}


export const indexQueryOptions = (token: string) =>
    queryOptions({
        queryKey: ['index', token],
        queryFn: ({ signal }) => fetchChatsAndUsers(token, signal),
        staleTime: 30_000,
    })