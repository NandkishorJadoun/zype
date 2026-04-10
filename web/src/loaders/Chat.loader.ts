import { userContext } from "../utils/userContext";

export const chatLoader = async ({ context, params }) => {
    const { token } = context.get(userContext);
    const { chatId } = params;

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