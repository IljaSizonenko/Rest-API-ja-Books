import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { validate } from "../middleware/validate.middleware";
import { reviewCreateSchema } from "../validators/review.validators";

const router = Router({ mergeParams: true });
/**
 * @swagger
 * /api/v1/books/{bookId}/reviews:
 *   get:
 *     summary: Get all reviews for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of reviews for the book
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Book not found
 */
router.get("/", ReviewController.getReviewsByBookId);
/**
 * @swagger
 * /api/v1/books/{bookId}/reviews:
 *   post:
 *     summary: Create a review for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewCreate'
 *     responses:
 *       201:
 *         description: Review created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Book not found
 */
router.post("/", validate(reviewCreateSchema), ReviewController.createReview);
/**
 * @swagger
 * /api/v1/books/{bookId}/reviews/average:
 *   get:
 *     summary: Get average rating for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Average rating calculated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookId:
 *                   type: integer
 *                 averageRating:
 *                   type: number
 *       404:
 *         description: Book not found
 */
router.get("/average", ReviewController.getAverageRating);
export default router