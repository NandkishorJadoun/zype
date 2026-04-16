import { userContext } from "./userContext";

export async function deleteChatAction({ request, context }) {
    const formData = await request.formData();
    const id = formData.get("id");
    const { token } = context.get(userContext);

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