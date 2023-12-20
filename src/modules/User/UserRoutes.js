import UserController from "@User/UserController.js";
import { Router } from "express";

const router = new Router();

router.post("/signUp", UserController.create);

router.get("/user/:id", UserController.findById);
router.patch("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);

export default router;
