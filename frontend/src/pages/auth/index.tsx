import { useState } from "react"
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom"
import { type LoginModal } from "../../types/modals"
import { createSession, createUser } from "../../services/auth";

interface FormState {
    name: string
    email: string
    password: string
    role: "customer" | "sale"
}
const OpenedEye = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12 C6 6 18 6 22 12 C18 18 6 18 2 12Z" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
)

const ClosedEye = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12 C6 6 18 6 22 12 C18 18 6 18 2 12Z" opacity="0.9" />
        <circle cx="12" cy="12" r="4" opacity="0.35" />
        <line x1="4" y1="4" x2="20" y2="20" />
    </svg>
)

export default function Login() {
    const [mode, setMode] = useState<LoginModal>("register")
    const [form, setForm] = useState<FormState>({ name: "", email: "", password: "", role: "customer" })
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    function handleModeChange(next: LoginModal) {
        setMode(next)
        setError(null)
        setForm({ name: "", email: "", password: "", role: "customer" })
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            if (isLogin) {
                const token = await createSession(form.email, form.password)
                localStorage.setItem("token", token)
                navigate("/")
            } else {
                const { name, email, password, role } = form
                await createUser({ name, email, password, role })
                handleModeChange("login")
            }
        } catch (error) {
            setError((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    const isLogin = mode === "login"

    return (
        <div className={styles.body}>
            <header>
                <h1>Entregas</h1>
                <p>{isLogin ? "Acesse sua conta" : "Crie sua conta"}</p>
            </header>

            <main>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        {!isLogin && (
                            <>
                                <div>
                                    <label htmlFor="name">Nome</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role">Perfil</label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={form.role}
                                        onChange={handleSelectChange}
                                    >
                                        <option value="customer">Cliente</option>
                                        <option value="sale">Vendedor</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.passwordField}>
                            <label htmlFor="password">Senha</label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                >
                                    {showPassword ? <ClosedEye /> : <OpenedEye />}
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    {error && <p className={styles.errorMessage}>Error: {error}</p>}

                    <button type="submit" disabled={isLoading}>
                        {isLoading
                            ? isLogin ? "Entrando..." : "Criando..."
                            : isLogin ? "Entrar" : "Criar conta"
                        }
                    </button>
                </form>
            </main>

            <footer>
                <span>
                    <p>
                        {isLogin ? "Não tem conta?" : "Já tem conta?"}
                    </p>
                    <button
                        type="button"
                        onClick={() => handleModeChange(isLogin ? "register" : "login")}
                    >
                        {isLogin ? "Cadastrar" : "Entrar"}
                    </button>
                </span>
                <p>© {new Date().getFullYear()} Entregas</p>
            </footer>
        </div>
    )
}