const express = require("express"); //Express server
const upload = require("../middleware/upload.js"); //File upload middleware
const router = express.Router(); //Router instance
const {
  createOrUpdateProfile,
  getMyProfile,
  getPublicUserProfile,
} = require("../controllers/profileController"); //Profile Controller connection
const protect = require("../middleware/authMiddleware");

// Create or update profile
router.post("/me", protect, upload.single("avatar"), createOrUpdateProfile);

// Get my profile
router.get("/me", protect, getMyProfile);

// Get public user profile by ID
router.get("/:id", getPublicUserProfile);

module.exports = router;
