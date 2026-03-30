import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { errorMiddleware } from "./middleware/error.middleware.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();
app.use(cors());
app.use(json());
app.use("/api/books", bookRoutes)
app.use(errorMiddleware);
export default app;