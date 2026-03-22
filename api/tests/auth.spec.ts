import { app } from '../src/app'
import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from "supertest"
import { prisma } from "../src/libs/prisma"


describe("POST /auth/signup", () => {

    beforeEach(async () => {
        await prisma.user.create({
            data: {
                username: "johndoe",
                email: "john@example.com",
                password: "12345678"
            }
        })
    })

    afterEach(async () => {
        await prisma.user.deleteMany({});
    })

    it("should return 422 when the email format is invalid", async () => {
        const res = await request(app)
            .post("/auth/signup")
            .type("form")
            .send({
                username: "johndoe",
                email: "johndoeemail.com",
                password: "12345678"
            })

        expect(res.status).toBe(422)
        expect(res.headers["content-type"]).match(/json/)
        expect(res.body).toEqual({ errors: [{ message: "Invalid email address" }] })
    })

    it("should return 409 when the email is already registered", async () => {
        const res = await request(app)
            .post("/auth/signup")
            .type("form")
            .send({
                username: "john",
                email: "john@example.com",
                password: "12345678"
            })

        expect(res.status).toBe(409)
        expect(res.headers["content-type"]).match(/json/)
        expect(res.body).toEqual({ message: "Email Already Registered" })
    })

    it("should register a new user successfully with valid data", async () => {
        const res = await request(app)
            .post("/auth/signup")
            .type("form")
            .send({
                email: "jana@example.com",
                username: "janadoe",
                password: "12345678"
            })

        expect(res.status).toBe(201)
        expect(res.headers["content-type"]).match(/json/)
        expect(res.body).toEqual({ message: "User registered successfully" })
    })
})
