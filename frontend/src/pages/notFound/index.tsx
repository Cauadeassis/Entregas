import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className={styles.body}>
            <main>
                <span>404</span>
                <h1>Página não encontrada</h1>
                <p>O endereço que você acessou não existe.</p>
                <button type="button" onClick={() => navigate(-1)}>
                    Voltar
                </button>
            </main>

            <footer>
                <p>© {new Date().getFullYear()} Entregas</p>
            </footer>
        </div>
    )
}