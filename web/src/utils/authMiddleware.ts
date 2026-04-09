import { userContext } from "./userContext";
import { redirect } from "react-router";

export const authMiddleware = ({ context }) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
        throw redirect("/auth");
    }

    context.set(userContext, { token, user: JSON.parse(user) });
};