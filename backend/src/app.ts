import express from "express";
import errorHandling from "./middlewares/errorHandler";
import routes from "./routes"
import cors from "cors"

const app = express();
app.use(cors({
    origin: "https://entregas-wine.vercel.app"
}))
app.use(express.json());
app.use(routes)
app.use(errorHandling)
export default app;