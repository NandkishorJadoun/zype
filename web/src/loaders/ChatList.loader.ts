import { userContext } from "../utils/userContext";

export const chatListLoader = async ({ context }) => {
    const { token } = context.get(userContext);

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