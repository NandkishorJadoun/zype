import { queryOptions } from "@tanstack/react-query";
import { ValidationError } from "./validation-error";
import { API_URL } from "../config";

export const fetchMe = async (token: string, signal: AbortSignal) => {
    const options = {
        headers: { Authorization: `Bearer ${token}` },
        signal
    }

    const res = await fetch(`${API_URL}/users/me`, options)
    if (!res.ok) throw new Error("Fail to load profile")
    return res.json()
}

export const meQueryOptions = (token: string) =>
    queryOptions({
        queryKey: ['me'],
        queryFn: ({ signal }) => fetchMe(token, signal),
        staleTime: 5 * 60 * 1000,
    })

export const updateProfile = async ({ token, formData }: { token: string; formData: FormData }) => {
    const options = {
        headers: { Authorization: `Bearer ${token}` },
        method: 'PATCH',
        body: formData,
    }

    const res = await fetch(`${API_URL}/users/me`, options);

    if (!res.ok) {
        if (res.status === 422 || res.status === 400) {
            const { errors } = await res.json()
            throw new ValidationError(errors)
        }
        throw new Error("Failed to update profile")
    }

    return res.json();
};
