import { userContext } from "../utils/userContext";
import { redirect, type LoaderFunction } from "react-router";

export const userProfileLoader: LoaderFunction = async ({ context, params }) => {
    const { userId } = params
    const session = context.get(userContext)

    if (!session) {
        throw redirect("/auth")
    }

    if (userId === session.user.id) {
        throw redirect("/users/me")
    }

    const { token } = session

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const user = await res.json()
        return user;

    } catch (error) {
        console.error(error)
    }
}