import { Request, Response, NextFunction } from "express"
import AppError from "../utils/AppError"
import Errors from "../utils/errors"

export default function authorizationVerifier(role: string[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.user) throw Errors.UNAUTHORIZED()
        if (!role.includes(request.user.role)) throw Errors.UNAUTHORIZED()
        return next()
    }
}