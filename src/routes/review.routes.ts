import { Router } from "express";
import { ReviewController } from "../controllers/review.controller.js";

const router = Router();
router.get("/:id", ReviewController.getById);
router.get("/book/:bookId", ReviewController.getByBook);
router.post("/book/:bookId", ReviewController.create);
router.put("/:id", ReviewController.update);
router.delete("/:id", ReviewController.delete);
router.get("/book/:bookId/average-rating", ReviewController.getAverageRating);
export default router