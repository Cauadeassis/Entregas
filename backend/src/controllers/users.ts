import { Request, Response } from "express"
import prisma from "../database/prisma"
import { z } from "zod"
import { hash } from "bcrypt"
import Errors from "../utils/errors"
import { registerSchema, updateUserSchema } from "../schemas"
import { type UpdateUserData } from "../types/data"

export default class UsersController {
    async create(request: Request, response: Response) {
        const { name, email, password } = registerSchema.parse(request.body)
        const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

        if (userWithSameEmail) throw Errors.EMAIL_ALREADY_EXISTS()

        const hashedPassword = await hash(password, 8)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        const { password: _, ...userWithoutPassword } = user
        return response
            .status(201)
            .json(userWithoutPassword)
    }
    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.uuid("Invalid ID")
        })
        const { id } = paramsSchema.parse(request.params)
        const body = updateUserSchema.parse(request.body)
        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) throw Errors.USER_NOT_FOUND()

        const data: UpdateUserData = {}

        if (body.name) data.name = body.name

        if (body.email) {
            const userWithSameEmail = await prisma.user.findFirst({
                where: {
                    email: body.email,
                    NOT: {
                        id
                    }
                }
            })

            if (userWithSameEmail) throw Errors.EMAIL_ALREADY_EXISTS()
            data.email = body.email
        }

        if (body.password) data.password = await hash(body.password, 8)
        if (body.role) data.role = body.role
        await prisma.user.update({
            where: {
                id
            },
            data
        })
        return response.json()
    }
}