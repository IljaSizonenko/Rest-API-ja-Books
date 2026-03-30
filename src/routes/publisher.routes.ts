import { Router } from "express";
import { PublisherController } from "../controllers/publisher.controller.js";

const router = Router();
/**
 * @openapi
 * /api/v1/publishers:
 *   get:
 *     summary: Get all publishers
 *     tags:
 *       - Publishers
 *     responses:
 *       200:
 *         description: List of publishers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publisher'
 */
router.get("/", PublisherController.getAll);
/**
 * @openapi
 * /api/v1/publishers/{id}:
 *   get:
 *     summary: Get publisher by ID
 *     tags:
 *       - Publishers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publisher found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publisher'
 *       404:
 *         description: Publisher not found
 */
router.get("/:id", PublisherController.getById);
/**
 * @openapi
 * /api/v1/publishers/{id}/relations:
 *   get:
 *     summary: Get publisher with related books
 *     tags:
 *       - Publishers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publisher with related books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 publisher:
 *                   $ref: '#/components/schemas/Publisher'
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *         description: Publisher not found
 */
router.get("/:id/relations", PublisherController.getWithRelations);
export default router