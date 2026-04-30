import express, { Router } from "express";
import { getUsers, getUserProfile, getCurrentUserProfile, patchUserProfile } from "../controllers/users.controller";
import { passport } from "../libs/passport";
import { upload } from "../libs/multer";

export const usersRouter: Router = express.Router();

usersRouter.use(passport.authenticate("jwt", { session: false }))
usersRouter.get("/", getUsers)
usersRouter.get("/me", getCurrentUserProfile)
usersRouter.patch("/me", upload.single('avatar'), patchUserProfile)
usersRouter.get("/:userId", getUserProfile)