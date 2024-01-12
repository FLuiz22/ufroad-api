import CourseController from "@Course/CourseController.js";
import { Router } from "express";
import auth from "@/middleware/auth/auth.js";

const route = new Router();

route.post("/course", auth.isAdmin, CourseController.create);

route.get("/course/:id", CourseController.findById);
route.patch("/course/:id", auth.isAdmin, CourseController.update);
route.patch("/course/sclass/:id", auth.isAdmin, CourseController.updateSClass);
route.patch("/course/curriculum/:id", auth.isAdmin, CourseController.updateCurriculum);
route.delete("/course/:id", auth.isAdmin, CourseController.delete);

export default route;
