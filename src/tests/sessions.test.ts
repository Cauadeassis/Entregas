import request from "supertest"
import prisma from "../database/prisma"
import app from "../app"
describe("UsersTests", () => {
    let testName: string = "Auth Test"
    let testEmail: string = "authtest@example.com"
    let testPassword: string = "testing123"
    let userId: string

    beforeAll(async () => {
        const userResponse = await request(app).post("/users").send({
            name: testName,
            email: testEmail,
            password: testPassword
        })
        userId = userResponse.body.id
    })

    afterAll(async () => {
        await prisma.user.delete({ where: { id: userId } })
    })

    test("Should authenticate and get JWT", async () => {
        const sessionResponse = await request(app).post("/sessions").send({
            email: testEmail,
            password: testPassword
        })

        expect(sessionResponse.status).toBe(200)
        expect(sessionResponse.body.token).toEqual(expect.any(String))
    })
})