import { app } from '../src/app'
import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from "supertest"
import { prisma } from "../src/libs/prisma"
import bcrypt from 'bcryptjs'

beforeEach(async () => {
    await prisma.user.create({
        data: {
            username: "johndoe",
            email: "john@example.com",
            password: await bcrypt.hash("12345678", 10)
        }
    })
})

afterEach(async () => {
    await prisma.user.deleteMany({});
})

describe("POST /auth/signup", () => {

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

describe("POST /auth/signin", () => {
    it("should return 401 when the email is not registered", async () => {
        const res = await request(app)
            .post("/auth/signin")
            .type("form")
            .send({
                email: "user@example.com",
                password: "12345678"
            })

        expect(res.headers["content-type"]).match(/json/)
        expect(res.status).toBe(401)
        expect(res.body).toEqual({ message: "Email is not registered." })
    })

    it("should return 401 when the password is wrong", async () => {
        const res = await request(app)
            .post("/auth/signin")
            .type("form")
            .send({
                email: "john@example.com",
                password: "Wrong Password"
            })

        expect(res.headers["content-type"]).match(/json/)
        expect(res.status).toBe(401)
        expect(res.body).toEqual({ message: "Invalid password." })
    })

    it("should login user successfully with valid credentials", async () => {
        const res = await request(app)
            .post("/auth/signin")
            .type("form")
            .send({
                email: "john@example.com",
                password: "12345678"
            })

        expect(res.headers["content-type"]).match(/json/)
        expect(res.status).toBe(200)
    })
})