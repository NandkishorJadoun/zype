import { userContext } from "../utils/userContext";
import { redirect, type LoaderFunction } from "react-router";

export const chatLoader: LoaderFunction = async ({ context, params }) => {
    
    const { chatId } = params;
    const token = context.get(userContext)?.token

    if (!token) {
        throw redirect("/auth")
    }

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/chats/${chatId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const chat = await res.json()
        return chat
    } catch (error) {
        console.error(error)
    }
}