export interface UpdateUserData {
    name?: string
    email?: string
    password?: string
    role?: "customer" | "sale"
}