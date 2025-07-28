const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.Controller");
const authMiddleware = require("../middleware/authMiddleware");

// Routes for register and login
// /**
//  * @route GET - /api/auth/register
//  * @group register authentication
//  * @desc Register a new user
//  */
router.post("/register", authController.register);

// /**
//  * @route POST - /api/auth/login
//  * @group login authentication
//  * @desc Login an existing user
//  */

router.post("/login", authController.login);

// /**
//   * @route GET - /api/auth/profile
//   * @group profile authentication
//   * @desc Get user profile
//   */


router.get("/profile", authMiddleware, authController.profile);

module.exports = router;
