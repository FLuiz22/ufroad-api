import ClassController from "@Class/ClassController.js";
import { Router } from "express";

const router = new Router();

router.get("/class/:id", ClassController.findById);
router.post("/class", ClassController.create);
router.patch("/class/:id", ClassController.update);
router.delete("/class/:id", ClassController.delete);

export default router;
