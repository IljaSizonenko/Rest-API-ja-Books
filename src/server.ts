import { errorMiddleware } from "./middleware/error.middleware";
import app from "./app";

app.use(errorMiddleware);
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server is running on port 3000`)
})