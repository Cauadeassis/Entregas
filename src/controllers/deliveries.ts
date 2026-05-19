import { z } from "zod"
import prisma from "../database/prisma"
import { Request, Response } from "express"

export default class DeliveriesController {
    async index(request: Request, response: Response) {
        const deliveries = await prisma.delivery.findMany({
            include: {
                user: { select: { name: true, email: true } }
            }
        })
        return response.json(deliveries)
    }
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            user_id: z.uuid("Invalid ID"),
            description: z.string("Invalid description")
        })
        const { user_id, description } = bodySchema.parse(request.body)
        await prisma.delivery.create({
            data: {
                userId: user_id,
                description
            }
        })
        return response.status(201).json()
    }
    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.uuid("Invalid ID")
        })
        const bodySchema = z.object({
            status: z.enum(["processing", "shipped", "delivered"])
        })
        const { id } = paramsSchema.parse(request.params)
        const { status } = bodySchema.parse(request.body)
        await prisma.delivery.update({
            data: {
                status,
            },
            where: {
                id,
            }
        })
        await prisma.deliveryLog.create({
            data: {
                deliveryId: id,
                description: status
            }
        })
        return response.json()
    }
}