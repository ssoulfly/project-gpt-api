const { login } = require("../services/user/login");
const { register } = require("../services/user/register");

module.exports.getProfile = async (req, res) => {
  console.log(req.user);
  res.send(req.user);
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res.send(token);
};

module.exports.register = async (req, res) => {
  console.log(req.body)
  const { email, username, password } = req.body;
  const ip = (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    ""
  )
    .split(",")[0]
    .trim(); 
  
  const token = await register(email, username, password, ip);
  console.log(token)
  res.send(token);
};
