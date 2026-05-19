export type DeliveryStatus = "processing" | "shipped" | "delivered"

export interface DeliveryUser {
    name: string
    email: string
}

export default interface Delivery {
    id: string
    description: string
    status: DeliveryStatus
    user: DeliveryUser
    createdAt: string
}