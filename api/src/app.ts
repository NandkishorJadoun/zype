import cors from "cors";
import express, { json, urlencoded, type Express, type Request, type Response, type NextFunction } from "express";
import { authRouter } from "./routes/auth.router.js";
import { usersRouter } from "./routes/users.router.js";
import { chatsRouter } from "./routes/chats.router.js";
import { UploadValidationError } from "./utils/UploadValidationError.js";
import multer from "multer";
import { createServer } from "node:http";
import { Server } from 'socket.io';

const app: Express = express()
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("joinChat", (chatId) => {
        socket.join(chatId)
        console.log(`Socket ${socket.id} joined chat: ${chatId}`);
    })

    socket.on("leaveChat", (chatId) => {
        socket.leave(chatId)
        console.log(`Socket ${socket.id} left chat: ${chatId}`);
    })
});

app.use(cors())
app.use(json())
app.set("socketio", io);
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

export default server;
