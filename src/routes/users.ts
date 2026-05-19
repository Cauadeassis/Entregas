import { Router } from "express"
import UsersController from "../controllers/users"
const userRoutes = Router()
const usersController = new UsersController;
userRoutes.post("/", usersController.create)
export default userRoutes