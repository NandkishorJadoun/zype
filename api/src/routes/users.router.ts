import express, { Router } from "express";
import { getUsers, getUserProfile } from "../controllers/users.controller";
import { passport } from "../libs/passport";

export const usersRouter: Router = express.Router();

usersRouter.get("/", passport.authenticate("jwt", { session: false }), getUsers)
usersRouter.get("/:userId", passport.authenticate("jwt", { session: false }), getUserProfile)