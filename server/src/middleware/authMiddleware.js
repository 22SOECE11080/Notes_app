const { verifyToken } = require("../utils/jwt");
const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ msg: "Invalid user" });
    }
    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
