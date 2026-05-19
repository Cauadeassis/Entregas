import express from "express";
import errorHandling from "./middlewares/errorHandler";
import routes from "./routes"

const app = express();
app.use(express.json());
app.use(routes)
app.use(errorHandling)
export default app;