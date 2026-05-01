import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserFormData } from "../schemas/auth.schema.js";
import { prisma } from "../libs/prisma.js";
import { passport } from "../libs/passport.js"
import jwt from "jsonwebtoken";
import { env } from "../schemas/env.schema.js";
import { Prisma, type User } from "@prisma/client";
import type { IVerifyOptions } from "passport-local";

const postSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const userForm = UserFormData.safeParse(body)

  if (!userForm.success) {
    return res.status(422).json({ errors: userForm.error.issues.map(issue => Object({ fieldName: issue.path[0], message: issue.message })) })
  }

  const { username, email, password } = userForm.data

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    const { id } = user;
    const token = jwt.sign({ id }, env.JWT_SECRET_KEY);
    return res.json({ user: { id, email }, token });

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error;
      if (prismaError.code === "P2002") {

        const meta = prismaError.meta as { driverAdapterError: { cause: { constraint: { fields: string[] } } } }

        const fieldName = meta.driverAdapterError.cause.constraint.fields[0]

        if (!fieldName) return next(error)

        const capitalizeField = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)

        return res.status(409).json({ errors: [{ fieldName, message: `${capitalizeField} Already Registered` }] })
      }
    }
    next(error)
  }
}

const postSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("local", { session: false }, (err: unknown, user: User, info: IVerifyOptions) => {
      if (err || !user) {
        const { message } = info;
        const fieldName = message.includes("Email") ? "email" : "password";

        return res.status(401).json({ fieldName, message });
      }

      req.login(user, { session: false }, (err) => {
        if (err) return res.send(err);

        const { id, email } = user;

        const token = jwt.sign({ id }, env.JWT_SECRET_KEY);
        return res.json({ user: { id, email }, token });
      });
    })(req, res);

  } catch (error) {
    next(error)
  }
}

export { postSignUp, postSignIn };