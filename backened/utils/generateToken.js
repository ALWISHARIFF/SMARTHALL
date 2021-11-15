const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: "30y" });
};
module.exports = generateToken;
