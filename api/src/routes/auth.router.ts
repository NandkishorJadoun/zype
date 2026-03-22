import express, { Router } from "express";
import { postSignUp } from "../controllers/auth.controller";

export const authRouter: Router = express.Router();

authRouter.post("/signup", postSignUp)