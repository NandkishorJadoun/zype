import * as z from "zod"

export const UserFormData = z.object({
    username: z
        .string()
        .trim()
        .regex(/^[a-zA-Z0-9]+$/, { message: "Username must contain only letters and numbers" })
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(10, { message: "Username must be at most 10 characters long" })
    ,

    email: z.email(),

    password: z
        .string()
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
})

export const PatchFormData = z.object({
    fullname: z
        .string()
        .trim()
        .nonempty({ message: "Name field cannot be empty" })
        .max(20, { message: "Name must be at most 20 characters long" }),

    username: z
        .string()
        .trim()
        .regex(/^[a-zA-Z0-9]+$/, { message: "Username must contain only letters and numbers" })
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(10, { message: "Username must be at most 10 characters long" })
    ,

    about: z
        .string()
        .trim()
        .max(50, { message: "About field must be at most 50 characters long" })
})