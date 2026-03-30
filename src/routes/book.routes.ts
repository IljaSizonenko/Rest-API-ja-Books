import { Router } from "express";
import { BookController } from "../controllers/book.controller.js";
import { ReviewController } from "../controllers/review.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { bookCreateSchema, bookUpdateSchema } from "../validators/book.validators.js";
import { reviewCreateSchema } from "../validators/review.validators.js";

const router = Router();
/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Get all books with filtering, sorting and pagination
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by book title (partial match)
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author full name (partial match)
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter by language (exact match)
 *       - in: query
 *         name: publishedYear
 *         schema:
 *           type: integer
 *         description: Filter by published year (exact match)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, publishedYear, language]
 *         description: Sort field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort direction
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page (default 10)
 *     responses:
 *       200:
 *         description: List of books with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *                     itemsPerPage:
 *                       type: integer
 *                     hasNextPage:
 *                       type: boolean
 *                     hasPreviousPage:
 *                       type: boolean
 */
router.get("/", BookController.getAll);
/**
 * @openapi
 * /api/v1/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.get("/:id", BookController.getById);
/**
 * @openapi
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error
 */
router.post("/", validate(bookCreateSchema), BookController.create);
/**
 * @openapi
 * /api/v1/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags:
 *       - Books
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
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.put("/:id", validate(bookUpdateSchema), BookController.update);
/**
 * @openapi
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
router.delete("/:id", BookController.delete);
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
router.get("/:bookId/reviews", ReviewController.getByBook);
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
router.post("/:bookId/reviews", validate(reviewCreateSchema), ReviewController.create);
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
router.get("/:bookId/average-rating", ReviewController.getAverageRating);
/**
 * @openapi
 * /api/v1/books/{id}/relations:
 *   get:
 *     summary: Get a book with all related entities
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book with related author, genres, publisher and reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 isbn:
 *                   type: string
 *                 publishedYear:
 *                   type: integer
 *                 pageCount:
 *                   type: integer
 *                 language:
 *                   type: string
 *                 description:
 *                   type: string
 *                 coverImage:
 *                   type: string
 *                 authorId:
 *                   type: integer
 *                 publisherId:
 *                   type: integer
 *                 genreIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                 authors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Author'
 *                 genres:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Genre'
 *                 publisher:
 *                   $ref: '#/components/schemas/Publisher'
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       404:
 *         description: Book not found
 */
router.get("/:id/relations", BookController.getWithRelations);
export default router