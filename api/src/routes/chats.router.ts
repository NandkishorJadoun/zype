import express, { Router } from "express";
import { getChats, getChat, deleteChat, postChat, createUserChat, getUserChat } from "../controllers/chats.controller";
import { passport } from "../libs/passport";

export const chatsRouter: Router = express.Router();

chatsRouter.get("/", passport.authenticate("jwt", { session: false }), getChats)
chatsRouter.get("/:chatId", passport.authenticate("jwt", { session: false }), getChat)
chatsRouter.post("/:chatId", passport.authenticate("jwt", { session: false }), postChat)
chatsRouter.delete("/:chatId", passport.authenticate("jwt", { session: false }), deleteChat)
chatsRouter.get("/user/:userId", passport.authenticate("jwt", { session: false }), getUserChat)
chatsRouter.post("/user/:userId", passport.authenticate("jwt", { session: false }), createUserChat)
