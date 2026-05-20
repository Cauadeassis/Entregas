import { useState, useEffect } from "react"
import styles from "./styles.module.css"
import type Delivery from "../../types/deliveries"
import type { DeliveryStatus } from "../../types/deliveries"
import { getDeliveries, createDelivery, updateDelivery } from "../../services/deliveries"
import { type CrudDeliveriesModal } from "../../types/modals"
import { type User } from "../../types/users"
import { getUsers } from "../../services/auth"

const statusLabel: Record<DeliveryStatus, string> = {
    processing: "Processando",
    shipped: "Enviado",
    delivered: "Entregue",
}

export default function Deliveries() {
    const [deliveries, setDeliveries] = useState<Delivery[]>([])
    const [modal, setModal] = useState<CrudDeliveriesModal>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [users, setUsers] = useState<User[]>([])

    async function fetchUsers() {
        try {
            const data = await getUsers()
            setUsers(data)
        } catch (error) {
            setError((error as Error).message)
        }
    }

    useEffect(() => {
        fetchDeliveries()
        fetchUsers()
    }, [])
    const closeModal = () => {
        setModal(null)
        setError(null)
    }

    async function fetchDeliveries() {
        try {
            const data = await getDeliveries()
            setDeliveries(data)
        } catch (error) {
            setError((error as Error).message)
        }
    }

    async function handleCreateDelivery(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const form = event.currentTarget
        const user_id = (form.elements.namedItem("user_id") as HTMLInputElement).value
        const description = (form.elements.namedItem("description") as HTMLInputElement).value

        try {
            await createDelivery(user_id, description)
            await fetchDeliveries()
            closeModal()
        } catch (error) {
            setError((error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    async function handleUpdateDelivery(event: React.FormEvent<HTMLFormElement>, id: string) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const form = event.currentTarget
        const status = (form.elements.namedItem("status") as HTMLSelectElement).value as DeliveryStatus

        try {
            await updateDelivery(id, status)
            await fetchDeliveries()
            closeModal()
        } catch (error) {
            setError((error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.body}>
            <header>
                <div>
                    <h1>Entregas</h1>
                    <p>Gerencie suas entregas</p>
                </div>
                <button type="button" className={styles.mainButton} onClick={() => setModal({ type: "create" })}>
                    Nova entrega
                </button>
            </header>

            <main>
                {error && !modal && <p className={styles.errorMessage}>{error}</p>}

                <table>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Usuário</th>
                            <th>Status</th>
                            <th>Criado em</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries.map(delivery => (
                            <tr key={delivery.id}>
                                <td>{delivery.description}</td>
                                <td>
                                    <span>{delivery.user.name}</span>
                                    <span className={styles.email}>{delivery.user.email}</span>
                                </td>
                                <td>
                                    <span className={`${styles.badge} ${styles[delivery.status]}`}>
                                        {statusLabel[delivery.status]}
                                    </span>
                                </td>
                                <td>{new Date(delivery.createdAt).toLocaleDateString("pt-BR")}</td>
                                <td>
                                    <button
                                        type="button"
                                        className={styles.ghostButton}
                                        onClick={() => setModal({ type: "update", delivery })}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {deliveries.length === 0 && (
                            <tr>
                                <td colSpan={5} className={styles.empty}>Nenhuma entrega encontrada</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>

            <footer>
                <p>© {new Date().getFullYear()} Entregas</p>
            </footer>

            {modal && (
                <div className={styles.overlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        {modal.type === "create" ? (
                            <>
                                <h2>Nova entrega</h2>
                                <form onSubmit={handleCreateDelivery}>
                                    <fieldset className={styles.fieldset}>
                                        <div>
                                            <label htmlFor="user_id">Usuário</label>
                                            <select id="user_id" name="user_id" required>
                                                <option value="">Selecione um usuário</option>
                                                {users.map(user => (
                                                    <option key={user.id} value={user.id}>
                                                        {user.name} — {user.email}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="description">Descrição</label>
                                            <input id="description" name="description" type="text" required />
                                        </div>
                                    </fieldset>
                                    {error && <p className={styles.errorMessage}>{error}</p>}
                                    <div className={styles.modalActions}>
                                        <button type="button" className={styles.ghostButton} onClick={closeModal}>Cancelar</button>
                                        <button type="submit" className={styles.mainButton} disabled={loading}>
                                            {loading ? "Criando..." : "Criar"}
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2>Atualizar entrega</h2>
                                <p>{modal.delivery.description}</p>
                                <form onSubmit={event => handleUpdateDelivery(event, modal.delivery.id)}>
                                    <fieldset>
                                        <div>
                                            <label htmlFor="status">Status</label>
                                            <select id="status" name="status" defaultValue={modal.delivery.status}>
                                                <option value="processing">Processando</option>
                                                <option value="shipped">Enviado</option>
                                                <option value="delivered">Entregue</option>
                                            </select>
                                        </div>
                                    </fieldset>
                                    {error && <p className={styles.errorMessage}>{error}</p>}
                                    <div className={styles.modalActions}>
                                        <button type="button" className={styles.ghostButton} onClick={closeModal}>Cancelar</button>
                                        <button type="submit" className={styles.mainButton} disabled={loading}>
                                            {loading ? "Salvando..." : "Salvar"}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}