const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

const checkAuth = (req, res, next) => {
  const token = req.headers["Authorization"] || req.headers["authorization"];
  if (!token) {
    return res.send({
      error: true,
      message: "Authorization Token Required!",
    });
  }
  jwt.verify(token, config.JWT_TOKEN, async (err, decoded) => {
    if (err) return res.send({
      error: true,
      message: "Token Not Accepted."
    });
    const user = await User.findOne({
      email: decoded.email,
    });
    if (!user) return res.send({
      error: true,
      message: "User not found!",
    });
    req.user = user;
    next();
  });
};

const checkGold = (req, res, next) => {
  if (!req.user) return res.send("Auth error.");
  if (req.user.type !== "gold")
    return res.send("No not have gold permission.");
  next();
};

module.exports = {
  checkAuth,
  checkGold,
};
