import express, { Router } from "express";
import { postSignUp, postSignIn } from "../controllers/auth.controller.js";

export const authRouter: Router = express.Router();

authRouter.post("/signup", postSignUp)
authRouter.post("/signin", postSignIn)