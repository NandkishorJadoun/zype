import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserFormData } from "../schemas/auth.schema";
import { prisma } from "../libs/prisma";
import { passport } from "../libs/passport"
import jwt from "jsonwebtoken";
import { env } from "../schemas/env.schema";
import { Prisma, type User } from "@prisma/client";

const postSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const userForm = UserFormData.safeParse(body)

  if (!userForm.success) {
    return res.status(422).json({ errors: userForm.error.issues.map(issue => Object({ message: issue.message })) })
  }

  const { username, email, password } = userForm.data

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    return res.status(201).json({ message: "User registered successfully" })

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError
      if (prismaError.code === "P2002") {
        return res.status(409).json({ message: "Email Already Registered" })
      }
    }

    next(error)
  }
}

const postSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("local", { session: false }, (err: unknown, user: User, info: { message: string }) => {
      if (err || !user) {
        const { message } = info;
        return res.status(401).json({ message });
      }

      req.login(user, { session: false }, (err) => {
        if (err) return res.send(err);

        const { id, username, email } = user;

        const token = jwt.sign({ id }, env.JWT_SECRET_KEY);
        return res.json({ user: { id, username, email }, token });
      });
    })(req, res);

  } catch (error) {
    next(error)
  }
}

export { postSignUp, postSignIn };