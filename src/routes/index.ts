import { Router } from "express";
import bookRoutes from "./book.routes.js";
import authorRoutes from "./author.routes.js";
import genreRoutes from "./genre.routes.js";
import publisherRoutes from "./publisher.routes.js";
import reviewRoutes from "./review.routes.js";

const router = Router();
router.use("/books", bookRoutes);
router.use("/authors", authorRoutes);
router.use("/genres", genreRoutes);
router.use("/publishers", publisherRoutes);
router.use("/reviews", reviewRoutes);
export default router