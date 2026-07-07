import { ValidationError } from "./validation-error";

const BASE_URL = import.meta.env.VITE_API_URL;

export const signUp = async (formData: FormData) => {

    const body = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        if (res.status === 422 || res.status === 409) {
            const { errors } = await res.json();
            throw new ValidationError(errors);
        }
        throw new Error("Failed to sign up");
    }

    return res.json() as Promise<{ token: string; id: string }>;
};

export const signIn = async (formData: FormData) => {

    const body = {
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const res = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        if (res.status === 401) {
            const { errors } = await res.json();
            throw new ValidationError(errors);
        }
        throw new Error("Failed to sign in");
    }

    return res.json() as Promise<{ token: string; id: string }>;
};
