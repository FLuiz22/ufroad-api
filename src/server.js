import 'dotenv/config';
import cors from 'cors';
import { setupDatabase } from './config/database.js';
import bodyParser from 'body-parser';
import express from 'express';
import UserRoutes from './modules/User/UserRoutes.js';

const server = express();

server.use(cors());

server.get('/', function (req, res) {
    return res.json({ message: "API conectada" });
})

setupDatabase();

server.use(express.json());
server.use(UserRoutes);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const port = process.env.PORT;

server.listen(port);

export default server;