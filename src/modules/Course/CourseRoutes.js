import CourseController from "@Course/CourseController.js";
import { Router } from "express";

const route = new Router();

route.post("/course", CourseController.create);

route.get("/course/:id", CourseController.findById);
route.patch("/course/:id", CourseController.update);
route.patch("/course/sclass/:id", CourseController.updateSClass);
route.patch("/course/curriculum/:id", CourseController.updateCurriculum);
route.delete("/course/:id", CourseController.delete);

export default route;
