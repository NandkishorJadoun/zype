import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";

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
                email: true,
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
    
    console.log(userId)

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
                email: true,
            }
        })

        if (!user) {
            return res.status(404).json({ message: `User with ${userId} not found` })
        }

        return res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}

export { getUsers, getUserProfile }