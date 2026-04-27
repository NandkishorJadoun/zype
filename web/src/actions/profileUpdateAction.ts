import { userContext } from "../utils/userContext";
import { redirect, type ActionFunction } from "react-router";

export const updateProfileAction: ActionFunction = async ({ request, context }) => {
    const token = context.get(userContext)?.token

    if (!token) {
        throw redirect("/auth")
    }

    const formData = await request.formData();
    const url = `${import.meta.env.VITE_API_URL}/users/me`

    const res = await fetch(url, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })

    if (!res.ok) {
        throw new Error("Something is wrong")
    }
    
    return { success: true };
}