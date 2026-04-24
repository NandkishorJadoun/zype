import { userContext } from "../utils/userContext";
import { redirect, type ActionFunction } from "react-router";

export const sendMessageAction: ActionFunction = async ({ request, context, params }) => {
    const formData = await request.formData();
    const message = formData.get("message");
    const token = context.get(userContext)?.token

    const { chatId } = params

    if (!token) {
        throw redirect("/auth")
    }

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