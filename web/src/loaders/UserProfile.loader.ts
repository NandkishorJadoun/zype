import { userContext } from "../utils/userContext";
import { redirect, type LoaderFunction } from "react-router";

export const userProfileLoader: LoaderFunction = async ({ context, params }) => {
    const { userId } = params
    const token = context.get(userContext)?.token

    if (!token) {
        throw redirect("/auth")
    }

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