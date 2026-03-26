import { Router } from "express";
import { ReviewController } from "../controllers/review.controller.js";

const router = Router();
/**
 * @openapi
 * /reviews/{id}:
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
router.get("/:id", ReviewController.getById);
/**
 * @openapi
 * /reviews/book/{bookId}:
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
router.get("/book/:bookId", ReviewController.getByBook);
/**
 * @openapi
 * /reviews/book/{bookId}:
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
router.post("/book/:bookId", ReviewController.create);
/**
 * @openapi
 * /reviews/{id}:
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
router.put("/:id", ReviewController.update);
/**
 * @openapi
 * /reviews/{id}:
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
router.delete("/:id", ReviewController.delete);
/**
 * @openapi
 * /reviews/book/{bookId}/average-rating:
 *   get:
 *     summary: Get average rating for a book
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
 *         description: Average rating calculated
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *       404:
 *         description: Book not found
 */
router.get("/book/:bookId/average-rating", ReviewController.getAverageRating);
export default router