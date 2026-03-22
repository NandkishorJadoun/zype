import { UserFormData } from "../schemas/auth.schema"

export type UserFormData = z.infer<typeof UserFormData>
