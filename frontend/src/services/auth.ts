const BASE_URL_SESSIONS = "/sessions"
const BASE_URL_USERS = "/users"
import { type UserRole } from "../types/users"

async function handleError(response: Response) {
    const data = await response.json()

    if (data.issues?.properties) {
        const properties = data.issues.properties
        const firstError =
            properties.name?.errors[0] ||
            properties.email?.errors[0] ||
            properties.password?.errors[0]

        throw new Error(firstError ?? data.message)
    }

    throw new Error(data.message)
}

export async function createSession(email: string, password: string): Promise<string> {
    const response = await fetch(BASE_URL_SESSIONS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) await handleError(response)

    const { token } = await response.json()
    return token
}

interface CreateUserProps {
    name: string
    email: string
    password: string
    role: UserRole
}

export async function createUser({ name, email, password, role }: CreateUserProps): Promise<void> {
    const response = await fetch(BASE_URL_USERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
    })
    if (!response.ok) await handleError(response)
}