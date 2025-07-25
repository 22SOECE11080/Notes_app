const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");
const { createResponse, customErrorHandler } = require("../utils/helper");

const authController = {
  register: async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
      if (!username || !email || !password) {
        return createResponse(res, false, 400, "All fields are required");
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return createResponse(res, false, 400, "Email already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

     
      return createResponse(res, true, 201, "User registered successfully", {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error); // ✅ this sends error to customErrorHandler
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = generateToken(user.id);
      res.json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  },

  profile: async (req, res) => {
    try {
      const user = req.user; // From authMiddleware
      res.json({
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (err) {
      res.status(500).json({ msg: "Could not retrieve profile" });
    }
  },
};

module.exports = authController;
