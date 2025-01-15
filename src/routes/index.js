const express = require("express");
const router = express.Router();
const SupabasAuthController = require("../controllers/SupabasAuthController.js");

// Auth routes
router.post("/api/register", SupabasAuthController.registerUser);
router.post("/api/login", SupabasAuthController.loginUser);
router.post("/api/logout", SupabasAuthController.logoutUser);
router.post("/api/reset-password", SupabasAuthController.resetPassword);

module.exports = router;
