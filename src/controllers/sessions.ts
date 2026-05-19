import { Request, Response } from "express"
import prisma from "../database/prisma"
import { z } from "zod"
import { compare } from "bcrypt"
import AppError from "../utils/AppError"
import { authConfig } from "../configs/auth"
import jwt from "jsonwebtoken"

export default class SessionsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.email("Invalid email"),
            password: z.string().min(6, "Password requires at least 6 characters")
        })
        const { email, password } = bodySchema.parse(request.body)
        const user = await prisma.user.findFirst({
            where: { email }
        })
        if (!user) throw new AppError("Invalid credentials", 401)
        const passwordMatched = await compare(password, user.password)
        if (!passwordMatched) throw new AppError("Invalid credentials", 401)

        const { secret, expiresIn } = authConfig.jwt
        const token = jwt.sign({ role: user.role ?? "customer" }, secret, {
            subject: user.id,
            expiresIn,
        })
        const { password: hashedPassword, ...userWithoutPassword } = user
        return response.json({ token, ...userWithoutPassword })
    }
}