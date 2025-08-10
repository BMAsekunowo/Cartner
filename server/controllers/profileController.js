const Profile = require("../models/profile.js");
const User = require("../models/user.js");
const Cart = require("../models/cart.js");
const Session = require("../models/session.js");
const mongoose = require("mongoose");
const { send } = require("vite");
const {
  sendProfileUpdatedEmail,
} = require("../utils/email/sendNotificationsEmail.js");

// Create or Update Profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const {
      bio,
      location,
      languages, // expected as comma-separated string or array
      occupation,
      phoneNumber,
    } = req.body;

    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

    const profileData = {
      user: userId,
      avatar,
      bio,
      location,
      occupation,
      phoneNumber,
    };

    if (avatar) profileData.avatar = avatar;

    // Convert languages to array if it's a comma-separated string
    if (languages) {
      if (Array.isArray(languages)) {
        profileData.languages = languages;
      } else {
        profileData.languages = languages.split(",").map((l) => l.trim());
      }
    }

    // Fetch carts and sessions where user is involved
    const userCarts = await Cart.find({ "sessionUsers.userId": userId }).select(
      "_id",
    );
    const userSessions = await Session.find({
      $or: [{ participants: userId }, { createdBy: userId }],
    }).select("_id");

    profileData.carts = userCarts.map((c) => c._id);
    profileData.sessions = userSessions.map((s) => s._id);

    let profile = await Profile.findOne({ user: userId });

    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: userId }, profileData, {
        new: true,
      });
      // Notify only if this is an actual update and user already had a profile
      await sendProfileUpdatedEmail(req.user.email, req.user.name);
    } else {
      profile = await Profile.create(profileData);
      // Notify on initial creation
      await sendProfileUpdatedEmail(req.user.email, req.user.name);
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error("Error creating/updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get My Profile
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ user: userId })
      .populate("user", "name email")
      .populate({
        path: "carts",
        model: "Cart",
        populate: {
          path: "sessionId",
          model: "Session",
          select: "sessionName",
        },
      })
      .populate({
        path: "sessions",
        model: "Session",
        select: "sessionName",
      });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile); // ✅ send directly
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Public Profile by User ID
exports.getPublicUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "name email",
    );

    if (!profile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error("Error fetching public profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
