const express = require("express"); //Express server
const router = express.Router(); //Router instance
const {
  registerUser,
  loginUser,
  validateToken,
  updateUserCredentials,
  verifyOtp,
} = require("../controllers/authController"); //Controller'
const protect = require("../middleware/authMiddleware"); //Authentication middleware

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", protect, validateToken);
router.patch("/update-credentials", protect, updateUserCredentials);
router.post("/verify-otp", verifyOtp);

//Token validation route
router.get("/validate-token", protect, (req, res) => {
  res.status(200).json({
    message: "Token is valid",
    user: req.user,
  });
});

module.exports = router;
