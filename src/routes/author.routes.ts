import { Router } from "express";
import { AuthorController } from "../controllers/author.controller.js";

const router = Router();
router.get("/", AuthorController.getAll);
router.get("/:id", AuthorController.getById);
router.get("/:id/relations", AuthorController.getWithRelations);
export default router