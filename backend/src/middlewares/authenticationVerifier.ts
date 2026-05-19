import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { authConfig } from "../configs/auth"
import AppError from "../utils/AppError"
import Errors from "../utils/errors"
interface TokenPayload {
    role: string
    sub: string
}

export default function authenticationVerifier(request: Request, response: Response, next: NextFunction) {
    try {
        const authHeader = request.headers.authorization
        if (!authHeader) throw Errors.UNAUTHORIZED()
        const [, token] = authHeader.split(" ")
        const { role, sub: user_id } = jwt.verify(token, authConfig.jwt.secret) as TokenPayload

        request.user = {
            id: user_id,
            role,
        }
        return next()
    } catch (error) {
        throw Errors.UNAUTHORIZED()
    }
}