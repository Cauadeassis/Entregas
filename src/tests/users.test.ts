import request from "supertest"
import prisma from "../database/prisma"
import app from "../app"
describe("UsersTests", () => {
    let userId: string
    let testName: string
    afterAll(async () => {
        await prisma.user.delete({ where: { id: userId } })
    })
    test("Should create a new user", async () => {
        testName = "Test"
        const response = await request(app)
            .post("/users")
            .send({
                name: testName,
                email: "test@example.com",
                password: "testing123"
            })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body.name).toBe(testName)
        expect(response.body).not.toHaveProperty("password")
        userId = response.body.id
    })
    test("Should not create user with same email", async () => {
        testName = "Duplicated Email Test"
        const response = await request(app)
            .post("/users")
            .send({
                name: testName,
                email: "test@example.com",
                password: "testing123"
            })
        expect(response.status).toBe(400)
    })
    test("Should throw a validation error if email is invalid", async () => {
        testName = "Invalid Email Test"
        const response = await request(app)
            .post("/users")
            .send({
                name: testName,
                email: "invalidEmail",
                password: "testing123"
            })
        expect(response.status).toBe(400)
    })
}
)