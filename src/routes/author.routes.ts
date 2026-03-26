import { Router } from "express";
import { AuthorController } from "../controllers/author.controller.js";

const router = Router();
/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: List of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 */
router.get("/", AuthorController.getAll);
/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 */
router.get("/:id", AuthorController.getById);
/**
 * @openapi
 * /authors/{id}/relations:
 *   get:
 *     summary: Get author with related books
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author with related books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 author:
 *                   $ref: '#/components/schemas/Author'
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *         description: Author not found
 */
router.get("/:id/relations", AuthorController.getWithRelations);
export default router