import ClassController from "@Class/ClassController.js";
import { Router } from "express";
import auth from "@/middleware/auth/auth.js";

const router = new Router();

router.get("/class/:id", ClassController.findById);
router.post("/class", auth.isAdmin, ClassController.create);
router.patch("/class/:id", auth.isAdmin, ClassController.update);
router.delete("/class/:id", auth.isAdmin, ClassController.delete);

export default router;
