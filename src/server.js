const cors = require('cors');
const databaseConfig = require('./config/database');
const bodyParser = require('body-parser');
const express = require('express');
const server = express();
require('dotenv/config');

server.use(cors());

server.get('/', function (req, res) {
    return res.json({ message: "API conectada" });
})

databaseConfig();

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const port = process.env.PORT;

server.listen(port);

module.exports = server;