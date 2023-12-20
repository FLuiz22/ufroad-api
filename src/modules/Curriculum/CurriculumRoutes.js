import CurriculumController from "./CurriculumController.js";
import { Router } from "express";
const router = new Router();

router.post("/curriculum", CurriculumController.create);
router.get("/curriculum", CurriculumController.getAll);
router.get("/curriculum/:id", CurriculumController.findById);

router.patch("/curriculum/:id", CurriculumController.update);
router.delete("/curriculum/:id", CurriculumController.delete);

export default router;
