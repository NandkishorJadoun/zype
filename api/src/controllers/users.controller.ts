import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { PatchFormData } from "../schemas/auth.schema";
import { ZodError } from "zod";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.user;

    try {
        const users = await prisma.user.findMany({
            where: {
                id: { not: id },
                chats: {
                    none: {
                        users: {
                            some: { id }
                        }
                    }
                }
            },
            select: {
                id: true,
                username: true,
                avatar: true,
                about: true,
            }
        })

        return res.status(200).json({ users })
    } catch (error) {
        next(error)
    }
}

const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { userId } = req.params

    if (Array.isArray(userId) || !userId) {
        return res.status(400).json({ message: "Invalid User ID" })
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                username: true,
                avatar: true,
                about: true,
            }
        })

        if (!user) {
            return res.status(404).json({ message: `User with ID "${userId}" not found` })
        }

        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const getCurrentUserProfile = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.user

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                username: true,
                avatar: true,
                about: true
            }
        })

        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const patchUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { file, body, user } = req

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = user
    let avatar = null;

    try {
        if (file) {
            avatar = (await uploadOnCloudinary(file)).secure_url
        }

        const userForm = PatchFormData.parse(body)

        const user = await prisma.user.update({
            where: { id },
            data: { ...(avatar && { avatar }), ...userForm },
            select: { id: true, username: true, avatar: true, about: true }
        })

        return res.json(user)

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(422).json({ errors: error.issues.map(issue => Object({ fieldName: issue.path[0], message: issue.message })) })
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res.status(409).json({ errors: { fieldName: "username", message: "Username is unavailable" } })
            }
        }
        next(error)
    }
}

export { getUsers, getUserProfile, getCurrentUserProfile, patchUserProfile }