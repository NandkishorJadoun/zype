import { userContext } from "../utils/userContext";
import { redirect, type LoaderFunction } from "react-router";

export const chatListLoader: LoaderFunction = async ({ context }) => {
    const token = context.get(userContext)?.token

    if (!token) {
        throw redirect("/auth")
    }

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/chats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const { chats } = await res.json()
        return chats

    } catch (error) {
        console.error(error)
    }
} 