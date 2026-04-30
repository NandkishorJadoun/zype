import { userContext } from "../utils/userContext";
import { redirect, type ActionFunction } from "react-router";

export const deleteChatAction: ActionFunction = async ({ request, context }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const pathname = formData.get("pathname");
    const token = context.get(userContext)?.token

    const isCurrentChat = typeof pathname === "string" && typeof id === "string" && pathname.includes(id)

    if (!token) {
        throw redirect("/auth")
    }

    const url = `${import.meta.env.VITE_API_URL}/chats/${id}`

    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error("Failed to delete chat")
    }

    return isCurrentChat ? redirect("/") : { success: true };
}