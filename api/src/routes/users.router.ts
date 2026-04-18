import express, { Router } from "express";
import { getUsers, getUserProfile, patchUserProfile } from "../controllers/users.controller";
import { passport } from "../libs/passport";
import { upload } from "../libs/multer";

export const usersRouter: Router = express.Router();

usersRouter.get("/", passport.authenticate("jwt", { session: false }), getUsers)
usersRouter.get("/:userId", passport.authenticate("jwt", { session: false }), getUserProfile)
usersRouter.patch("/me", passport.authenticate("jwt", { session: false }), upload.single('avatar'), patchUserProfile)