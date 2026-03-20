import cors from "cors";
import express, { json, urlencoded, type Express } from "express";
import { index } from "./routes/index.route";

export const app: Express = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))

app.use("/", index)