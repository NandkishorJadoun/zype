import express, { Router } from "express";
import { getChats, getUserChat } from "../controllers/chats.controller";
import { passport } from "../libs/passport";

export const chatsRouter: Router = express.Router();

chatsRouter.get("/", passport.authenticate("jwt", { session: false }), getChats)
chatsRouter.get("/:chatId", passport.authenticate("jwt", { session: false }), getUserChat)
// chatsRouter.patch("/user/:userId", passport.authenticate("jwt", { session: false }), postUserChat)