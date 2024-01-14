import CurriculumController from "@Curriculum/CurriculumController.js";
import { Router } from "express";
import auth from "@/middleware/auth/auth.js";

const router = new Router();

router.post("/curriculum", auth.isAdmin, CurriculumController.create);
router.get("/curriculum", CurriculumController.getAll);
router.get("/curriculum/:id", CurriculumController.findById);

router.patch("/curriculum/:id", auth.isAdmin, CurriculumController.update);
router.delete("/curriculum/:id", auth.isAdmin, CurriculumController.delete);

export default router;
