const bcrypt = require("bcryptjs");
const  User  = require("../models/user");
const { generateToken } = require("../utils/jwt");

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword });

      const token = generateToken(newUser.id);

      res.status(201).json({
        token,
        user: { id: newUser.id, username: newUser.username },
      });
    } catch (error) {
      res.status(500).json({ msg: "Error in register, Server Error" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = generateToken(user.id);
      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  },

  profile: async (req, res) => {
    try {
      const user = req.user; // From authMiddleware
      res.json({ user: { id: user.id, username: user.username } });
    } catch (err) {
      res.status(500).json({ msg: "Could not retrieve profile" });
    }
  },
};

module.exports = authController;
