import { userContext } from "../utils/userContext";
import { redirect, type ActionFunction } from "react-router";

export const sendMessageAction: ActionFunction = async ({ request, context, params }) => {
    const formData = await request.formData();
    const message = formData.get("message");

    if (typeof message === "string" && !message.trim()) {
        return null;
    }

    const token = context.get(userContext)?.token
    if (!token) {
        throw redirect("/auth")
    }

    const { chatId } = params

    const url = `${import.meta.env.VITE_API_URL}/chats/${chatId}`

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ message }),
        })

        if (!res.ok) {
            throw new Error("Failed to send message")
        }

        return { success: true };

    } catch (error) {
        console.error(error)
    }
}