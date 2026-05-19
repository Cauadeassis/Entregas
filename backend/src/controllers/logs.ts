import { z } from "zod"
import prisma from "../database/prisma"
import { Request, Response } from "express"
import Errors from "../utils/errors"
import { createLogSchema } from "../schemas"

export default class LogsController {
    async create(request: Request, response: Response) {
        const { delivery_id, description } = createLogSchema.parse(request.body)
        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id }
        })
        if (!delivery) throw Errors.DELIVERY_NOT_FOUND()
        if (delivery.status === "processing") throw Errors.DELIVERY_MUST_BE_SHIPPED()
        if (delivery.status === "delivered") throw Errors.DELIVERY_ALREADY_DELIVERED()
        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description
            }
        })
        return response.status(201).json()
    }
    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            delivery_id: z.uuid()
        })
        const { delivery_id } = paramsSchema.parse(request.params)
        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id },
            include: {
                logs: true,
                user: true
            }
        })

        if (request.user?.role === "customer"
            && request.user.id !== delivery?.userId) {
            throw Errors.DELIVERY_FORBIDDEN()
        }
    }
}