import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserFormData } from "../schemas/auth.schema";
import { prisma } from "../libs/prisma";

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
        console.log(error)
        next(error)
    }
}

export { postSignUp };