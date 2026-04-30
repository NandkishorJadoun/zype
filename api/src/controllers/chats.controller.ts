import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { Prisma, type Chat } from "@prisma/client";

export const getChats = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.user;

    try {
        const chats = await prisma.chat.findMany({
            where: { users: { some: { id } } },
            include: {
                users: {
                    where: {
                        id: { not: id }
                    },
                    select: {
                        id: true, username: true, avatar: true
                    }
                },
                messages: {
                    take: 1,
                    orderBy: { created_at: "desc" }
                }
            },
            orderBy: {
                updated_at: "desc"
            }
        })

        return res.status(200).json(chats)

    } catch (error) {

        next(error)
    }
}

export const getChat = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id

    const { chatId } = req.params;

    if (Array.isArray(chatId) || !chatId) {
        return res.status(400).json({ message: "Invalid Chat ID" })
    }

    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId
            },
            include: {
                messages: true,
                users: {
                    where:
                    {
                        id: { not: userId }
                    },
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        avatar: true,
                    }
                },
            }
        })

        return res.status(200).json(chat)

    } catch (error) {

        next(error)
    }
}

export const postChat = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id

    if (Array.isArray(req.params.chatId) || !req.params.chatId) {
        return res.status(400).json({ message: "Invalid Chat ID" })
    }

    const { chatId } = req.params;

    const msg = req.body.message;

    try {
        const updatedChat = await prisma.chat.update({
            where: { id: chatId },
            data: {
                updated_at: new Date(),
                messages: {
                    create: {
                        data: msg,
                        userId: userId,
                    },
                },
            },
            include: {
                messages: {
                    orderBy: { created_at: 'desc' },
                    take: 1,
                },
            },
        });

        const newMessage = updatedChat.messages[0];

        res.status(201).json(newMessage)

    } catch (error) {
        next(error)
    }
}

export const deleteChat = async (req: Request, res: Response, next: NextFunction) => {

    const { chatId } = req.params;

    if (Array.isArray(chatId) || !chatId) {
        return res.status(400).json({ message: "Invalid Chat ID" })
    }

    const deleteMessages = prisma.message.deleteMany({
        where: {
            chatId
        }
    })

    const deleteChat = prisma.chat.delete({
        where: {
            id: chatId
        }
    })

    try {
        await prisma.$transaction([deleteMessages, deleteChat])
        return res.status(204).send()
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            const prismaError = error as Prisma.PrismaClientKnownRequestError
            if (prismaError.code === "P2025") {
                return res.status(404).json({ message: `Chat with ID "${chatId}" not found` })
            }
        }
        next(error)
    }
}

export const getUserChat = async (req: Request, res: Response, next: NextFunction) => {

    if (Array.isArray(req.params.userId) || !req.params.userId) {
        return res.status(400).json({ message: "Invalid User ID" })
    }

    const receiverId = req.params.userId;

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const senderId = req.user.id;

    if (senderId === receiverId) {
        return res.status(400).json({ message: "Invalid User ID" })
    }

    try {

        const chatQuery = prisma.chat.findFirst({
            where: {
                AND: [
                    {
                        users: {
                            some: {
                                id: senderId
                            }
                        }
                    },
                    {
                        users: {
                            some: {
                                id: receiverId
                            }
                        }
                    }
                ]
            }
        })

        const userQuery = prisma.user.findUnique({
            where: {
                id: receiverId
            },
            select: {
                id: true,
                username: true,
                avatar: true
            }
        })

        const [user, chat] = await prisma.$transaction([userQuery, chatQuery])

        res.status(200).json({ user, chat })

    } catch (error) {
        next(error)
    }
}

export const createUserChat = async (req: Request, res: Response, next: NextFunction) => {

    if (Array.isArray(req.params.userId) || !req.params.userId) {
        return res.status(400).json({ message: "Invalid User ID" })
    }

    const receiverId = req.params.userId;

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const senderId = req.user.id;

    if (senderId === receiverId) {
        return res.status(400).json({ message: "Invalid User ID" })
    }

    const message = req.body.message;

    let chat: Chat | null;

    try {
        // check if chat already exist, if exist then get the id and add message in it

        chat = await prisma.chat.findFirst({
            where: {
                AND: [
                    {
                        users: {
                            some: {
                                id: senderId
                            }
                        }
                    },
                    {
                        users: {
                            some: {
                                id: receiverId
                            }
                        }
                    }
                ]
            }

        })

        // if chat not created, create it with adding message

        if (!chat) {
            chat = await prisma.chat.create({
                data: {
                    users: {
                        connect: [{ id: senderId }, { id: receiverId }]
                    },
                    messages: {
                        create: {
                            userId: senderId,
                            data: message
                        }
                    }
                }
            })

            return res.status(201).json(chat)
        }

        await prisma.message.create({
            data: {
                data: message,
                userId: senderId,
                chatId: chat.id
            }
        })

        res.status(201).json(chat)

    } catch (error) {
        next(error)
    }
}