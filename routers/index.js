const app = require("express").Router();

app.get("/", (req, res) => {
  res.status(200).json({ message: "</>", success: true });
});

module.exports = app;
