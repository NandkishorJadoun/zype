import { queryOptions } from "@tanstack/react-query";

export const fetchUser = async (token: string, userId: string, signal: AbortSignal) => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const options = { headers: { Authorization: `Bearer ${token}` }, signal }
    const res = await fetch(`${BASE_URL}/users/${userId}`, options)
    if (!res.ok) throw new Error("Fail to load profile")
    return res.json()
}

export const userQueryOptions = (token: string, userId: string) =>
    queryOptions({
        queryKey: ['users', userId, token],
        queryFn: ({ signal }) => fetchUser(token, userId, signal),
    })
