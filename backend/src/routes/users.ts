import { Router } from "express"
import UsersController from "../controllers/users"
const userRoutes = Router()
const usersController = new UsersController;
userRoutes.get("/", usersController.index)
userRoutes.post("/", usersController.create)
// Em breve userRoutes.patch("/:id", usersController.update)
export default userRoutes