import { Router } from "express";
import { ReviewController } from "../controllers/review.controller.js";

const router = Router();
/**
 * @openapi
 * /api/v1/reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.get("/api/v1/reviews/:id", ReviewController.getById);
/**
 * @openapi
 * /api/v1/books/{bookId}/reviews:
 *   get:
 *     summary: Get all reviews for a book
 *     tags:
 *       - Reviews
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
router.get("/api/v1/books/:bookId/reviews", ReviewController.getByBook);
/**
 * @openapi
 * /api/v1/books/{bookId}/reviews:
 *   post:
 *     summary: Create a review for a book
 *     tags:
 *       - Reviews
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
 *             $ref: '#/components/schemas/Review'
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
router.post("/api/v1/books/:bookId/reviews", ReviewController.create);
/**
 * @openapi
 * /api/v1/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.put("/api/v1/reviews/:id", ReviewController.update);
/**
 * @openapi
 * /api/v1/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */
router.delete("/api/v1/reviews/:id", ReviewController.delete);
/**
 * @openapi
 * /api/v1/books/{id}/average-rating:
 *   get:
 *     summary: Get average rating for a book
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Average rating calculated
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *       404:
 *         description: Book not found
 */
router.get("/api/v1/books/:id/average-rating", ReviewController.getAverageRating);
export default router