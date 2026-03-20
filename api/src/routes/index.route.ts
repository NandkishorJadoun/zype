import { Router } from "express"

export const index: Router = Router()

index.get("/", (_req, res) => res.json({ message: "Server is running..." }))