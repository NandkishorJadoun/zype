import * as z from "zod";
import 'dotenv/config'

const envVariables = z.object({
    NODE_ENV: z.string(),
    DATABASE_URL: z.string(),
    TEST_DATABASE_URL: z.string(),
    JWT_SECRET_KEY: z.string(),
})

export const env = envVariables.parse(process.env)