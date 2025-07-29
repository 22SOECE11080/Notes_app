const jwt = require("jsonwebtoken");

const generateToken = (userId,username) => {
  return jwt.sign({ id: userId,username:username }, process.env.JWT_SECRET, {
    expiresIn: "7d", // can change to 15m + refresh token if needed
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
