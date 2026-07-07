import express, { Router } from "express";
import { getChats, getChat, deleteChat, postChat, createUserChat, getUserChat } from "../controllers/chats.controller.js";
import { passport } from "../libs/passport.js";
import { upload } from "../libs/multer.js";

export const chatsRouter: Router = express.Router();

chatsRouter.use(passport.authenticate("jwt", { session: false }))
chatsRouter.get("/", getChats)
chatsRouter.get("/:chatId", getChat)
chatsRouter.post("/:chatId", upload.none(), postChat)
chatsRouter.delete("/:chatId", deleteChat)
chatsRouter.get("/user/:userId", getUserChat)
chatsRouter.post("/user/:userId", upload.none(), createUserChat)
