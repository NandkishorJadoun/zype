import { userContext } from "../utils/userContext";
import type { UserResponse } from "../types";
import { redirect, type LoaderFunction } from "react-router";

export const userListLoader: LoaderFunction = async ({ context }) => {
    const token = context.get(userContext)?.token

    if (!token) {
        throw redirect("/auth")
    }

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