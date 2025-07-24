const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware")

// Routes for register and login
router.post("/register" , authController.register);
router.post("/login", authController.login);

router.get("/profile", authMiddleware, authController.profile);

module.exports = router;