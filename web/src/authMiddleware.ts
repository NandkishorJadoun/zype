/* import { userContext } from "./userContext";
import { redirect } from "react-router";

const authMiddleware = ({ context }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw redirect("/login");
    }
    context.set(userContext, token);
};

export { authMiddleware }; */