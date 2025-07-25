const User = require("../models/user"); //User Model
const JWT = require("jsonwebtoken"); //Handling Authentication
const bcrypt = require("bcryptjs"); //Hashing and Comparison
const OTP = require("../models/otp"); //OTP Model for Two-Factor Authentication
const { sendWelcomeEmail } = require("../utils/email/emailService");
const { sendOTPEmail } = require("../utils/email/sendOtpEmail");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "Oops, looks like you already have an account with us",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    await newUser.save();
    console.log("✅ New user registered:", newUser.email);

    await sendWelcomeEmail(newUser.email, newUser.name);

    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = Date.now() + 10 * 60 * 1000;

    await OTP.create({ userId: newUser._id, code: otpCode, expiresAt });

    await sendOTPEmail(newUser.email, newUser.name, otpCode, "register");

    return res.status(201).json({
      message: "Registration successful. OTP has been sent to your email.",
      userId: newUser._id,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again shortly.",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Please fill in both email and password" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // 🔐 Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save OTP to DB
    await OTP.create({ userId: user._id, code: otpCode, expiresAt });

    // ✅ Send Login OTP email using grouped function
    await sendOTPEmail(user.email, user.name, otpCode, "login");

    return res.status(200).json({
      message: "OTP sent to your email. Please verify to complete login.",
      userId: user._id,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { userId, code } = req.body;

  try {
    const otpRecord = await OTP.findOne({ userId, code });

    if (!otpRecord || otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await OTP.deleteMany({ userId }); // Optional: remove all OTPs for user

    // ✅ Generate token after successful OTP verification
    const user = await User.findById(userId);
    const token = JWT.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "6h" },
    );

    return res.status(200).json({
      message: "OTP verified successfully",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Server error during OTP verification" });
  }
};

exports.updateUserCredentials = async (req, res) => {
  const userId = req.user.id;
  const { email, password, currentPassword } = req.body;

  if (!email && !password) {
    return res.status(400).json({
      message: "Provide at least one field to update: email or password",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Handle Email Update immediately
    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing && existing._id.toString() !== userId) {
        return res.status(400).json({
          message: "This email is already in use by another account",
        });
      }

      user.email = email;
      await user.save();

      return res.status(200).json({
        message: "Email updated successfully",
        updatedFields: { email },
      });
    }

    // Prepare to send OTP for Password Update
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({
          message: "Provide your current password to update password",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Current password is incorrect",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters long",
        });
      }

      // Save OTP for verification
      const otpCode = Math.floor(100000 + Math.random() * 900000);
      const expiresAt = Date.now() + 10 * 60 * 1000;

      await OTP.create({
        userId,
        code: otpCode,
        expiresAt,
        purpose: "updateCredentials",
        meta: { password }, // Save only password in meta for now
      });

      // Send OTP email
      await sendOTPEmail(user.email, user.name, otpCode, "updateCredentials");

      return res.status(200).json({
        message:
          "OTP sent to your email. Please verify to complete password update.",
      });
    }
  } catch (error) {
    console.error("❌ updateUserCredentials error:", error);
    return res.status(500).json({
      message: "Something went wrong while updating credentials",
    });
  }
};

exports.validateToken = (req, res) => {
  console.log("req.user:", req.user); // 🔍 Check if user is defined

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const newToken = JWT.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });
  console.log("Token refreshed successfully ✅");
  res.json({ token: newToken });
};
