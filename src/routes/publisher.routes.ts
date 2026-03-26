import { Router } from "express";
import { PublisherController } from "../controllers/publisher.controller.js";

const router = Router();
router.get("/", PublisherController.getAll);
router.get("/:id", PublisherController.getById);
router.get("/:id/relations", PublisherController.getWithRelations);
export default router