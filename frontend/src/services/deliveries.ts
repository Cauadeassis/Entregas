import type Delivery from "../types/deliveries"
import type { DeliveryStatus } from "../types/deliveries"
const BASE_URL = import.meta.env.VITE_API_URL ?? ""

const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
})

async function handleError(response: Response) {
    const data = await response.json()

    if (response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
        return
    }

    if (data.issues?.properties) {
        const properties = data.issues.properties
        const firstError =
            properties.user_id?.errors[0] ||
            properties.description?.errors[0] ||
            properties.status?.errors[0]

        throw new Error(firstError ?? data.message)
    }

    throw new Error(data.message)
}

export async function getDeliveries(): Promise<Delivery[]> {
    const response = await fetch(`${BASE_URL}/deliveries`, { headers: authHeaders() })
    if (!response.ok) await handleError(response)
    return response.json()
}

export async function createDelivery(user_id: string, description: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/deliveries`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ user_id, description }),
    })
    if (!response.ok) await handleError(response)
}

export async function updateDelivery(id: string, status: DeliveryStatus): Promise<void> {
    const response = await fetch(`${BASE_URL}/deliveries/${id}/status`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status }),
    })
    if (!response.ok) await handleError(response)
}