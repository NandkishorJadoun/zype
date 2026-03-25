import { app } from '../src/app'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'
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

    // create chat between user1 and user2

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

describe("GET /users", () => {

    it("show all users who exist on the platform but user1 haven't chatted them yet", async () => {
        const login = await request(app).post("/auth/signin").type("form").send({
            email: "user1@example.com",
            password: "12345678"
        })

        const { token } = login.body;

        const res = await request(app).get("/users").set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body).toEqual(
            {
                users: [
                    expect.objectContaining({ email: 'user4@example.com' }),
                    expect.objectContaining({ email: 'user5@example.com' }),
                ]
            }
        )
    })

    it("show all users who exist on the platform but user3 haven't chatted them yet", async () => {
        const login = await request(app).post("/auth/signin").type("form").send({
            email: "user3@example.com",
            password: "12345678"
        })

        const { token } = login.body;

        const res = await request(app).get("/users").set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body).toEqual(
            {
                users: [
                    expect.objectContaining({ email: 'user2@example.com' }),
                    expect.objectContaining({ email: 'user5@example.com' }),
                ]
            }
        )

    })

    it("show all users who exist on the platform but user5 haven't chatted them yet", async () => {
        const login = await request(app).post("/auth/signin").type("form").send({
            email: "user5@example.com",
            password: "12345678"
        })

        const { token } = login.body;

        const res = await request(app).get("/users").set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body).toEqual(
            {
                users: [
                    expect.objectContaining({ email: 'user1@example.com' }),
                    expect.objectContaining({ email: 'user2@example.com' }),
                    expect.objectContaining({ email: 'user3@example.com' }),
                    expect.objectContaining({ email: 'user4@example.com' }),
                ]
            }
        )

    })
})

describe("GET /users/:userId", () => {

    it("shows the profile of the user1", async () => {
        const login = await request(app).post("/auth/signin").type("form").send({
            email: "user1@example.com",
            password: "12345678"
        })

        const { token } = login.body;
        const userId = login.body.user.id;

        const res = await request(app).get(`/users/${userId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body.user).toEqual(expect.objectContaining({ email: 'user1@example.com' })
        )
    })

})


