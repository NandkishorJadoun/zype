import { userContext } from "../utils/userContext";
import { redirect, type LoaderFunction } from "react-router";

export const userLoader: LoaderFunction = async ({ context, params }) => {
    const { userId } = params;
    const token = context.get(userContext)?.token

    if (!token) {
        throw redirect("/auth")
    }

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/chats/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await res.json()

        return data
    } catch (error) {
        console.error(error)
    }
} 