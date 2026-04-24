import { userContext } from "./userContext";
import { redirect } from "react-router";
import type { MiddlewareFunction } from "react-router";

export const authMiddleware: MiddlewareFunction = ({ context }) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
        throw redirect("/auth");
    }

    context.set(userContext, { token, user: JSON.parse(user) });
};