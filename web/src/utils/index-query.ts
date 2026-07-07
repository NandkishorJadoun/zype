import { queryOptions } from "@tanstack/react-query";

export const fetchChatsAndUsers = async (token: string, signal: AbortSignal) => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const options = { headers: { Authorization: `Bearer ${token}` }, signal }
    const [chatsRes, usersRes] = await Promise.all([
        fetch(`${BASE_URL}/chats`, options),
        fetch(`${BASE_URL}/users`, options),
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
    })