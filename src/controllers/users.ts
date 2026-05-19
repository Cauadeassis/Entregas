import { Request, Response } from "express"
import prisma from "../database/prisma"
import { z } from "zod"
import { hash } from "bcrypt"
import AppError from "../utils/AppError"

export default class UsersController {
    index(request: Request, response: Response) {
        return response.json({ message: "ok" })
    }
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(3, "Name requires at least 3 characters"),
            email: z.email("Invalid email"),
            password: z.string().min(6, "Password requires at least 6 characters"),

        })
        const { name, email, password } = bodySchema.parse(request.body)
        const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

        if (userWithSameEmail) throw new AppError("Email already exists")

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
}