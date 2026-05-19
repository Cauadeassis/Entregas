import { Router } from "express"
import LogsController from "../controllers/logs"
import verifyAuthentication from "../middlewares/authenticationVerifier";
import verifyAuthorization from "../middlewares/authorizationVerifier";
const logsRoutes = Router()
const logsController = new LogsController;
logsRoutes.get(
    "/:delivery_id/show",
    verifyAuthentication,
    verifyAuthorization(["sale"]),
    logsController.show)
logsRoutes.post(
    "/",
    verifyAuthentication,
    verifyAuthorization(["sale"]),
    logsController.create)
export default logsRoutes