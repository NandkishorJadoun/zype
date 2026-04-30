import express, { Router } from "express";
import { getChats, getChat, deleteChat, postChat, createUserChat, getUserChat } from "../controllers/chats.controller";
import { passport } from "../libs/passport";

export const chatsRouter: Router = express.Router();

chatsRouter.use(passport.authenticate("jwt", { session: false }))
chatsRouter.get("/", getChats)
chatsRouter.get("/:chatId", getChat)
chatsRouter.post("/:chatId", postChat)
chatsRouter.delete("/:chatId", deleteChat)
chatsRouter.get("/user/:userId", getUserChat)
chatsRouter.post("/user/:userId", createUserChat)
