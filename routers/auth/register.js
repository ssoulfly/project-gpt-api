const app = require("express").Router();
const errorHandler = require("../../middlewares/ErrorHandler");
const userEndpoint = require("../../apis/userEndpoint");

app.post("/", errorHandler(userEndpoint.register));

module.exports = app;
