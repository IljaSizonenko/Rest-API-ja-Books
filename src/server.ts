import { errorMiddleware } from "./middleware/error.middleware";
import app from "./app";

app.use(errorMiddleware)