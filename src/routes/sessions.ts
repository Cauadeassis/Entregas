import { Router } from "express"
import SessionsController from "../controllers/sessions"
const sessionRoutes = Router()
const sessionsController = new SessionsController;
sessionRoutes.post("/", sessionsController.create)
export default sessionRoutes