import { userContext } from "../utils/userContext";

export const userLoader = async ({ context, params }) => {
    const { token } = context.get(userContext);
    const { userId } = params;

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