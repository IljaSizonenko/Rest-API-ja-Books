import { Router } from "express"
import { GenreController } from "../controllers/genre.controller.js"

const router = Router()
router.get("/", GenreController.getAll);
router.get("/:id", GenreController.getById);
router.get("/:id/relations", GenreController.getWithRelations);
export default router