import * as z from "zod"

export const UserFormData = z.object({
    username: z.string().trim().nonempty().regex(/^[a-zA-Z0-9]+$/, {
        message: "Username must contain only letters and numbers",
    }),
    email: z.email(),
    password: z.string().trim().length(8, { message: "Password must be 8 character long" })
})