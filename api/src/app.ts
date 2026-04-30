import cors from "cors";
import express, { json, urlencoded, type Express, type Request, type Response, type NextFunction } from "express";
import { authRouter } from "./routes/auth.router";
import { usersRouter } from "./routes/users.router";
import { chatsRouter } from "./routes/chats.router";
import { UploadValidationError } from "./utils/UploadValidationError";
import multer from "multer";

const app: Express = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))

app.get("/", (_req, res) => res.json({ message: "Server is running..." }))
app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use("/chats", chatsRouter)

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("[Error Handler]", err)
    if (err instanceof multer.MulterError || err instanceof UploadValidationError) {
        const { field, message } = err
        const status = err instanceof UploadValidationError ? 415 : 400
        return res.status(status).json({ errors: [{ fieldName: field, message }] })
    }
    res.status(500).json({ message: "Internal Server Error" })
})

export default app;
