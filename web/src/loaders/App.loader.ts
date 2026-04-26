import { userContext } from "../utils/userContext";
import { redirect, type LoaderFunction } from "react-router";

export const appLoader: LoaderFunction = async ({ context }) => {
    const token = context.get(userContext)?.token

    if (!token) {
        throw redirect("/auth")
    }

    const [chatsRes, usersRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/chats`, {
            headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${import.meta.env.VITE_API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
        }),
    ]);

    const { chats } = await chatsRes.json();
    const { users } = await usersRes.json();
    return { chats, users };
} 