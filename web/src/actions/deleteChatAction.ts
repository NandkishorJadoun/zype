import { userContext } from "./userContext";
import { redirect, type ActionFunction } from "react-router";

export const deleteChatAction: ActionFunction = async ({ request, context }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const token = context.get(userContext)?.token

    if (!token) {
        throw redirect("/auth")
    }

    const url = `${import.meta.env.VITE_API_URL}/chats/${id}`

    try {
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            throw new Error("Failed to delete chat")
        }
        return { success: true };

    } catch (error) {
        console.error(error)
    }
}