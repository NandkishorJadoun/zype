import { userContext } from "../utils/userContext";
import { redirect, type ActionFunction } from "react-router";

export const createChatAction: ActionFunction = async ({ request, context, params }) => {
    const formData = await request.formData();
    const message = formData.get("message");

    if (typeof message === "string" && !message.trim()) {
        return null;
    }

    const token = context.get(userContext)?.token
    if (!token) {
        throw redirect("/auth")
    }

    const { userId } = params
    const url = `${import.meta.env.VITE_API_URL}/chats/user/${userId}`

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
            throw new Error("Failed to create chat")
        }

        const { id } = await res.json()
        return redirect(`/chats/${id}`);

    } catch (error) {
        console.error(error)
    }
}