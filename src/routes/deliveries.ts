import { Router } from "express"
import DeliveriesController from "../controllers/deliveries"
import authenticationVerifier from "../middlewares/authenticationVerifier";
import authorizationVerifier from "../middlewares/authorizationVerifier";

const deliveriesRoutes = Router()
const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(authenticationVerifier, authorizationVerifier(["sale", "customer"]))

deliveriesRoutes.get("/", deliveriesController.index)
deliveriesRoutes.post("/", deliveriesController.create)
deliveriesRoutes.patch("/:id/status", deliveriesController.update)
export default deliveriesRoutes