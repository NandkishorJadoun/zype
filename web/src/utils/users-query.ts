import { queryOptions } from "@tanstack/react-query";
import { API_URL } from "../config";

export const fetchUser = async (token: string, userId: string, signal: AbortSignal) => {
    const options = { headers: { Authorization: `Bearer ${token}` }, signal }
    const res = await fetch(`${API_URL}/users/${userId}`, options)
    if (!res.ok) throw new Error("Fail to load profile")
    return res.json()
}

export const userQueryOptions = (token: string, userId: string) =>
    queryOptions({
        queryKey: ['users', userId, token],
        queryFn: ({ signal }) => fetchUser(token, userId, signal),
        staleTime: 5 * 60 * 1000,
    })
