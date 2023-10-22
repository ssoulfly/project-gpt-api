const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const config = require("../../config");
const crypto = require("crypto");

module.exports.login = async (email, password) => {
  const user = await User.findOne({
    email,
  });
  if (!user) throw new Error("Kullanıcı adı veya parola yanlış.");

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (user.hashPassword !== hashPassword) {
    throw new Error("Kullanıcı adı veya parola yanlış.");
  }

  const token = jwt.sign(
    {
      email: user.email,
      password,
    },
    config.JWT_TOKEN,
    {
      expiresIn: "4w",
    }
  );

  return {
    token,
  };
};
