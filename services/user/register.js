const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const config = require("../../config.js");
const crypto = require("crypto");

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

module.exports.register = async (email, username, password, ip) => {
  let user = await User.findOne({
    email,
  });
  if (user)
    throw new Error({
      error: true,
      message: "Bu mail ile daha önce hesap oluşturulmuştur.",
    });
  
  const checkUserSecurity = await User.find({ ip });
  if (checkUserSecurity.length >= 3)
    throw new Error({
      error: true,
      message: "Hesap oluşturulamadı :(",
    });

  if (!isValidEmail(email))
    throw new Error({
      error: true,
      message: "Lütfen geçerli bir e-posta adresi girin",
    });

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  await new User({
    email,
    username,
    hashPassword,
    ip,
  }).save();

  const token = jwt.sign(
    {
      email,
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
