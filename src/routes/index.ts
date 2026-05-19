import { Router } from "express"
import usersRoutes from "./users"
import sessionsRoutes from "./sessions"
import deliveriesRoutes from "./deliveries"
import logsRoutes from "./logs"
const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/deliveries", deliveriesRoutes)
routes.use("/logs", logsRoutes)
export default routes