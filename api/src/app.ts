import cors from "cors";
import express, { json, urlencoded, type Express, type Request, type Response, type NextFunction } from "express";
import { authRouter } from "./routes/auth.router";
import { Prisma } from "@prisma/client";

export const app: Express = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))

app.get("/", (_req, res) => res.json({ message: "Server is running..." }))
app.use("/auth", authRouter)

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const prismaError = err as Prisma.PrismaClientKnownRequestError
        if (prismaError.code === "P2002") {
            return res.status(409).json({ message: "Email Already Registered" })
        }
    }

    res.status(500).json({ message: "Internal Server Error" })
})