import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";

const getChats = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.user;

    try {
        const chats = await prisma.user.findUnique({
            where: { id },
            select: {
                chats: {
                    include: {
                        users: {
                            where: {
                                id: {
                                    not: id
                                }
                            },
                            select: {
                                id: true,
                                email: true,
                                username: true,
                            }
                        }
                    }
                }
            },
        })

        return res.status(200).json(chats)

    } catch (error) {

        next(error)
    }
}

const getUserChat = async (req: Request, res: Response, next: NextFunction) => {

    const { chatId } = req.params;

    if (Array.isArray(chatId) || !chatId) {
        return res.status(400).json({ message: "Invalid User ID" })
    }

    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId
            },
            include: {
                messages: true,
                users: true,
            }
        })

        return res.status(200).json({ chat })

    } catch (error) {

        next(error)
    }
}



export { getChats, getUserChat }