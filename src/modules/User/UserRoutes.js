import UserController from "@User/UserController.js";
import { Router } from "express";
import auth from "@/middleware/auth/auth.js";

const router = new Router();

router.post("/signUp", auth.isAdmin, UserController.create);

router.get("/user/:id", auth.isItself, UserController.findById);
router.patch("/user/:id", auth.isItself, UserController.update);
router.delete("/user/:id", auth.isItself, UserController.delete);

export default router;
