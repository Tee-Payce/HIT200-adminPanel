const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");

router.post("/login", authController.loginUser);
router.post("/register", authController.createUser);

module.exports = router;
