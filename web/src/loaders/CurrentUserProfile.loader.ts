import { userContext } from "../utils/userContext";
import { redirect, type LoaderFunction } from "react-router";

export const currentUserProfileLoader: LoaderFunction = async ({ context }) => {

    const token = context.get(userContext)?.token

    if (!token) {
        throw redirect("/auth")
    }

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const user = await res.json()

        return user

    } catch (error) {
        console.error(error)
    }
}