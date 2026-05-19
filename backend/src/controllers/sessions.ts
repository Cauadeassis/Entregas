import { Request, Response } from "express"
import prisma from "../database/prisma"
import { z } from "zod"
import { compare } from "bcrypt"
import Errors from "../utils/errors"
import { authConfig } from "../configs/auth"
import jwt from "jsonwebtoken"
import { loginSchema } from "../schemas"

export default class SessionsController {
    async create(request: Request, response: Response) {
        const { email, password } = loginSchema.parse(request.body)
        const user = await prisma.user.findFirst({
            where: { email }
        })
        if (!user) throw Errors.INVALID_CREDENTIALS()
        const passwordMatched = await compare(password, user.password)
        if (!passwordMatched) throw Errors.INVALID_CREDENTIALS()

        const { secret, expiresIn } = authConfig.jwt
        const token = jwt.sign({ role: user.role ?? "customer" }, secret, {
            subject: user.id,
            expiresIn,
        })
        const { password: hashedPassword, ...userWithoutPassword } = user
        return response.json({ token, ...userWithoutPassword })
    }
}