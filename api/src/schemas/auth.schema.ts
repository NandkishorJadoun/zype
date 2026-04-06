import * as z from "zod"

export const UserFormData = z.object({
    username: z
        .string()
        .trim()
        .regex(/^[a-zA-Z0-9]+$/, {
            message: "Username must contain only letters and numbers"
        })
        .min(3, {
            message: "Username must be at least 3 characters long",
        })
        .max(10, {
            message: "Username must be at most 10 characters long",
        })
    ,

    email: z.email(),

    password: z
        .string()
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
})