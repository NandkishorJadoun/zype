import { app } from '../src/app'
import { expect, describe, it, beforeAll, afterAll, beforeEach } from 'vitest'
import request from "supertest"
import { prisma } from "../src/libs/prisma"
import bcrypt from 'bcryptjs'

beforeAll(async () => {
    const createUsers = prisma.user.createMany({
        data: [
            {
                username: "user1",
                email: "user1@example.com",
                password: await bcrypt.hash("12345678", 10)
            }, {
                username: "user2",
                email: "user2@example.com",
                password: await bcrypt.hash("12345678", 10)
            }, {
                username: "user3",
                email: "user3@example.com",
                password: await bcrypt.hash("12345678", 10)
            }, {
                username: "user4",
                email: "user4@example.com",
                password: await bcrypt.hash("12345678", 10)
            }, {
                username: "user5",
                email: "user5@example.com",
                password: await bcrypt.hash("12345678", 10)
            }
        ]
    })

    // create chat between userX and userY

    const createChat12 = prisma.chat.create({
        data: {
            users: {
                connect: [{ email: "user1@example.com" }, { email: "user2@example.com" }]
            }
        },
    })

    const createChat13 = prisma.chat.create({
        data: {
            users: {
                connect: [{ email: "user1@example.com" }, { email: "user3@example.com" }]
            }
        },
    })

    const createChat24 = prisma.chat.create({
        data: {
            users: {
                connect: [{ email: "user2@example.com" }, { email: "user4@example.com" }]
            }
        },
    })

    const createChat34 = prisma.chat.create({
        data: {
            users: {
                connect: [{ email: "user3@example.com" }, { email: "user4@example.com" }]
            }
        },
    })

    await prisma.$transaction([createUsers, createChat12, createChat13, createChat24, createChat34])

})

afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany({});
    const deleteChats = prisma.chat.deleteMany({});
    await prisma.$transaction([deleteChats, deleteUsers]);
})

describe("GET /chats", async () => {
    it("show all chats for user1", async () => {
        const login = await request(app).post("/auth/signin").type("form").send({
            email: "user1@example.com",
            password: "12345678"
        })

        const { token } = login.body;

        const res = await request(app).get("/chats").set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body.chats).toHaveLength(2)
    })

    it("show all chats for user5", async () => {
        const login = await request(app).post("/auth/signin").type("form").send({
            email: "user5@example.com",
            password: "12345678"
        })

        const { token } = login.body;

        const res = await request(app).get("/chats").set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body.chats).toHaveLength(0)
    })
})

describe("GET /chats/:chatId", async () => {
    let token = "";
    beforeEach(async () => {
        const login = await request(app).post("/auth/signin").type("form").send({
            email: "user1@example.com",
            password: "12345678"
        })

        token = login.body.token;
    })

    it("show return null when id is wrong", async () => {

        const chatId = "FakeChatId"
        const res = await request(app).get(`/chats/${chatId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body.chat).toBeNull()
    })

    it("show messages when id is correct", async () => {

        const user1Chat = await prisma.chat.findFirst({
            where: {
                users: {
                    some: { email: "user1@example.com" }
                }
            },
        })

        const res = await request(app).get(`/chats/${user1Chat?.id}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body.chat.id).toBe(user1Chat?.id)
        expect(res.body.chat.users).toHaveLength(2)
    })
})

describe("DELETE /chats/:chatId", async () => {
    let token = "";
    beforeEach(async () => {
        const login = await request(app).post("/auth/signin").type("form").send({
            email: "user1@example.com",
            password: "12345678"
        })

        token = login.body.token;
    })

    it("should throw error when id is invalid", async () => {

        const chatId = "FakeChatId"
        const res = await request(app).delete(`/chats/${chatId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(404)
        expect(res.body).toEqual({ message: 'Chat with ID "FakeChatId" not found' })
    })

    it("show messages when id is correct", async () => {

        const user1Chat = await prisma.chat.findFirst({
            where: {
                users: {
                    some: { email: "user1@example.com" }
                }
            },
        })

        const res = await request(app).delete(`/chats/${user1Chat?.id}`).set('Authorization', `Bearer ${token}`)

        console.log(res.body)
        expect(res.status).toBe(204)
    })
})

/* describe("GET /chats/user/:userId", async () => {
    let token = "";
    beforeEach(async () => {
        const login = await request(app).post("/auth/signin").type("form").send({
            email: "user1@example.com",
            password: "12345678"
        })

        token = login.body.token;
    })

    it("show chat between user1 and user2", async () => {
        const receiver = await prisma.user.findUnique({ where: { email: 'user2@example.com' }, select: { id: true } });

        const res = await request(app).get(`/chats/user/${receiver?.id}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body).toEqual({})
    })
}) */