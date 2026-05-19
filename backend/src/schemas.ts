import { z } from "zod"

export const createDeliverySchema = z.object({
    user_id: z.uuid("Invalid ID"),
    description: z.string().min(1, "Description is required"),
})

export const updateDeliverySchema = z.object({
    status: z.enum(["processing", "shipped", "delivered"]),
})

export const createLogSchema = z.object({
    delivery_id: z.uuid(),
    description: z.string(),
})

export const loginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password requires at least 6 characters"),
})

export const registerSchema = loginSchema.extend({
    name: z.string().trim().min(3, "Name requires at least 3 characters"),
    role: z.enum(["customer", "sale"]).default("customer"),
})

export const updateUserSchema = z.object({
    name: z.string().trim().min(3, "Name requires at least 3 characters").optional(),
    email: z.email("Invalid email").optional(),
    password: z.string().min(6, "Password requires at least 6 characters").optional(),
    role: z.enum(["customer", "sale"]).optional()
})