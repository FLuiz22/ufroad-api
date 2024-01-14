import "dotenv/config";
import "express-async-errors";
import cors from "cors";
import { setupDatabase } from "@config/database.js";
import bodyParser from "body-parser";
import express from "express";
import errorHandler from "@middleware/errorHandler.js";

import UserRoutes from "@User/UserRoutes.js";
import CurriculumRoutes from "@Curriculum/CurriculumRoutes.js";
import ClassRoutes from "@Class/ClassRoutes.js";
import CourseRoutes from "@Course/CourseRoutes.js";
import AuthRoutes from "@Auth/AuthRoutes.js";

const server = express();

server.use(cors());

server.get("/", function (req, res) {
    return res.json({ message: "API conectada" });
});

setupDatabase();

server.use(express.json());
server.use(UserRoutes, CurriculumRoutes, ClassRoutes, CourseRoutes, AuthRoutes);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(errorHandler);

const port = process.env.PORT;

server.listen(port);

export default server;
