import { userContext } from "../utils/userContext";

export const userProfileLoader = async ({ context, params }) => {
    const { token } = context.get(userContext);
    const { userId } = params

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const users = await res.json()
        return users

    } catch (error) {
        console.error(error)
    }
}