const express = require("express");

const projectRouter = require('./projects/projectRouter.js');

const server = express();

server.use(express.json());
server.use('/api', projectRouter);

module.exports = server;