import AuthController from "@Auth/AuthController.js";
import { Router } from "express";

const router = new Router();

router.post("/signIn", AuthController.signIn);

export default router;
