import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AuthPage from "./pages/auth"
import DeliveriesPage from "./pages/deliveries"

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token")

    const isAuthenticated =
        token &&
        token !== "undefined" &&
        token !== "null"

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <DeliveriesPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}