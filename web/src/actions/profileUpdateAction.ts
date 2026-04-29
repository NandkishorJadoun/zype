import { userContext } from "../utils/userContext";
import { redirect, type ActionFunction } from "react-router";

export const updateProfileAction: ActionFunction = async ({ request, context }) => {
    const token = context.get(userContext)?.token

    if (!token) {
        throw redirect("/auth")
    }

    const formData = await request.formData();

    const avatar = formData.get("avatar")

    if (avatar instanceof File && !avatar.name && !avatar.size) {
        formData.delete("avatar")
    }

    const url = `${import.meta.env.VITE_API_URL}/users/me`
    const res = await fetch(url, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })

    if (!res.ok) {
        const { errors } = await res.json()
        return errors
    }

    return redirect("/users/me")
}