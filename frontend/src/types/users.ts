export type UserRole = "customer" | "sale"

export interface User {
    id: string
    name: string
    email: string
    password: string
    role: UserRole
    createdAt: string
    updatedAt: string | null
}