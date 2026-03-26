import { Router } from "express"
import { GenreController } from "../controllers/genre.controller.js"

const router = Router();
/**
 * @openapi
 * /genres:
 *   get:
 *     summary: Get all genres
 *     tags:
 *       - Genres
 *     responses:
 *       200:
 *         description: List of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 */
router.get("/", GenreController.getAll);
/**
 * @openapi
 * /genres/{id}:
 *   get:
 *     summary: Get genre by ID
 *     tags:
 *       - Genres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Genre found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre not found
 */
router.get("/:id", GenreController.getById);
/**
 * @openapi
 * /genres/{id}/relations:
 *   get:
 *     summary: Get genre with related books
 *     tags:
 *       - Genres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Genre with related books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 genre:
 *                   $ref: '#/components/schemas/Genre'
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *         description: Genre not found
 */
router.get("/:id/relations", GenreController.getWithRelations);
export default router