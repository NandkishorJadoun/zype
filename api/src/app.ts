import cors from "cors";
import express, { json, urlencoded, type Express } from "express";

export const app: Express = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))

app.get("/", (_req, res) => res.json({ message: "Server is running..." }))