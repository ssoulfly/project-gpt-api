const app = require("express").Router();
const errorHandler = require("../../middlewares/ErrorHandler");
const userEndpoint = require("../../apis/userEndpoint");

app.post("/", errorHandler(userEndpoint.login));

module.exports = app;
