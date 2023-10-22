const app = require("express").Router();
const errorHandler = require("../../middlewares/ErrorHandler");
const userEndpoint = require("../../apis/userEndpoint");
const { checkAuth } = require("../../middlewares/Auth");

app.use(checkAuth);
app.post("/", errorHandler(userEndpoint.getProfile));

module.exports = app;
