import { userContext } from "../utils/userContext";
import type { UserResponse } from "../types";

export const userListLoader = async ({ context }) => {
    const { token } = context.get(userContext);

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const { users }: UserResponse = await res.json()
        return users

    } catch (error) {
        console.error(error)
    }
} 